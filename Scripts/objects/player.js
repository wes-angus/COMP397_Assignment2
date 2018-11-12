var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Player class
var objects;
(function (objects) {
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        //constructors
        function Player(x, y, moveStep, shotDelay, invincibleDelay) {
            if (x === void 0) { x = 45; }
            if (y === void 0) { y = 240; }
            if (moveStep === void 0) { moveStep = 8; }
            if (shotDelay === void 0) { shotDelay = 10; }
            if (invincibleDelay === void 0) { invincibleDelay = 60; }
            var _this = _super.call(this, "tank", true) || this;
            _this._shootFrame = 0;
            _this.x = x;
            _this.y = y;
            _this._moveStep = moveStep;
            _this._shotDelay = shotDelay;
            _this._invincibleDelay = invincibleDelay;
            _this.Start();
            return _this;
        }
        //private methods
        //Function for damaging the player and triggering the start of their invinciblity period
        Player.prototype.takeDamage = function () {
            createjs.Sound.play("explodeSound", { volume: 0.1 });
            managers.Game.scoreBoard.Lives--;
            this._invincible = true;
            this.alpha = 0.5;
            this._invincibleFrame = createjs.Ticker.getTicks() + this._invincibleDelay;
        };
        //Function for handling collision between the player and other objects
        Player.prototype.resolveCollision = function (other) {
            if (!this._invincible || other.name === "coin") {
                _super.prototype.resolveCollision.call(this, other);
            }
            switch (other.name) {
                //Increas coin count and award extra life if enough coins are collected
                case "coin":
                    createjs.Sound.play("coinSound", { volume: 0.1 });
                    managers.Game.scoreBoard.Score += 50;
                    other.Destroy();
                    managers.Game.scoreBoard.Coins++;
                    if (managers.Game.scoreBoard.Coins % 25 === 0) {
                        managers.Game.scoreBoard.Lives++;
                        createjs.Sound.play("lifeSound", { volume: 0.1 });
                    }
                    else {
                    }
                    break;
                case "enemy":
                    //Ignore obstacles when invincible
                    if (!this._invincible) {
                        this.takeDamage();
                    }
                    break;
                case "bullet":
                    if (!this._invincible) {
                        other.IsInPlay = false;
                        this.takeDamage();
                    }
                    break;
            }
            //If game has ended, move to the game over screen and update the high score if need be
            if (managers.Game.scoreBoard.Lives < 1) {
                managers.Game.curState = config.Scene.OVER;
                if (managers.Game.scoreBoard.Score > managers.Game.scoreBoard.HighScore) {
                    managers.Game.scoreBoard.HighScore = managers.Game.scoreBoard.Score;
                }
            }
        };
        //Function to apply keyboard input to the player
        Player.prototype._handleInput = function () {
            if (managers.Input.isKeydown(config.INPUT_KEY[0][config.ActionEnum.Up])) {
                this.y -= this._moveStep;
            }
            else if (managers.Input.isKeydown(config.INPUT_KEY[1][config.ActionEnum.Up])) {
                this.y -= this._moveStep / 2;
            }
            if (managers.Input.isKeydown(config.INPUT_KEY[0][config.ActionEnum.Down])) {
                this.y += this._moveStep;
            }
            else if (managers.Input.isKeydown(config.INPUT_KEY[1][config.ActionEnum.Down])) {
                this.y += this._moveStep / 2;
            }
            if (managers.Input.isKeydown(config.INPUT_KEY[0][config.ActionEnum.Left])) {
                this.x -= this._moveStep / 2;
            }
            else if (managers.Input.isKeydown(config.INPUT_KEY[1][config.ActionEnum.Left])) {
                this.x -= this._moveStep / 4;
            }
            if (managers.Input.isKeydown(config.INPUT_KEY[0][config.ActionEnum.Right])) {
                this.x += this._moveStep / 2;
            }
            else if (managers.Input.isKeydown(config.INPUT_KEY[1][config.ActionEnum.Right])) {
                this.x += this._moveStep / 4;
            }
            //If enough time has passed between shots  and the button is held down, fire a bullet
            if (createjs.Ticker.getTicks() > this._shootFrame) {
                if (managers.Input.isKeydown(config.INPUT_KEY[0][config.ActionEnum.Shoot]) ||
                    managers.Input.isKeydown(config.INPUT_KEY[1][config.ActionEnum.Shoot])) {
                    managers.Game.bulletManager.FireBullet(util.Vector2.Add(this.Position, this._bulletSpawn), util.Vector2.right(), "player");
                    this._shootFrame = createjs.Ticker.getTicks() + this._shotDelay;
                }
            }
            this._checkBounds();
        };
        //Function that stops the player from moving off screen
        Player.prototype._checkBounds = function () {
            if (this.y > 480 - this.HalfHeight + 8) {
                this.y = 480 - this.HalfHeight + 8;
            }
            else if (this.y < this.HalfHeight) {
                this.y = this.HalfHeight;
            }
            if (this.x > 720 - this.HalfWidth) {
                this.x = 720 - this.HalfWidth;
            }
            else if (this.x < this.HalfWidth) {
                this.x = this.HalfWidth;
            }
        };
        //public methods
        Player.prototype.Reset = function () {
        };
        Player.prototype.Destroy = function () {
        };
        Player.prototype.Start = function () {
            this._bulletSpawn = new util.Vector2(4 + this.HalfWidth, -4);
        };
        Player.prototype.Update = function () {
            if (this._invincible) {
                //Reset the player's invincibility once the period is done
                if (createjs.Ticker.getTicks() > this._invincibleFrame) {
                    this.alpha = 1;
                    this._invincible = false;
                }
            }
            this._handleInput();
            this._updatePosition();
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map