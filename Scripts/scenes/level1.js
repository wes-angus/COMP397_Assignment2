//Music: Wonderland (Instrumental) by Dexter Britain
//Source: https://dexterbritain.com/
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
//Main level scene class
var scenes;
(function (scenes) {
    var Level1 = /** @class */ (function (_super) {
        __extends(Level1, _super);
        //public props
        //constructor
        function Level1() {
            var _this = _super.call(this) || this;
            _this._coinCount = 4;
            _this._startingEnemies = 20;
            _this._enemyCount = 4;
            _this.Start();
            return _this;
        }
        //private methods
        //public methods
        Level1.prototype.Reset = function () {
        };
        Level1.prototype.Destroy = function () {
            this.removeAllChildren();
            this._music.stop();
        };
        Level1.prototype.Start = function () {
            //Ocean background
            this._space = new objects.Background();
            //Player object
            this._player = new objects.Player();
            //Coin array
            this._coins = [];
            //Enemy object
            this._enemies = [];
            this._music = createjs.Sound.play("levelMusic", { volume: 0.2, loop: -1 });
            //Instantiate new bullet manager
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManager = this._bulletManager;
            this.Main();
        };
        Level1.prototype.Update = function () {
            var _this = this;
            //Update all game objects in the level and check collisions between certain ones
            this._space.Update();
            this._player.Update();
            if (this._coins.length < this._coinCount) {
                if (createjs.Ticker.getTicks() % 60 === 0) {
                    this._coins.push(new objects.Coin());
                    this.addChild(this._coins[this._coins.length - 1]);
                }
            }
            this._coins.forEach(function (coin) {
                coin.Update();
                _this._player.checkIntersectionNotCentered(coin);
            });
            if (this._enemies.length < this._enemyCount) {
                if (createjs.Ticker.getTicks() % 120 === 0) {
                    this._enemies.push(new objects.Enemy());
                    this.addChild(this._enemies[this._enemies.length - 1]);
                }
            }
            this._enemies.forEach(function (enemy) {
                enemy.Update();
                _this._player.checkIntersectionNotCentered(enemy);
            });
            this._bulletManager.Update();
            this._bulletManager.Bullets.forEach(function (bullet) {
                /* Check if the bullet is active and whether it came from
                the player or an enemy to prevent unneeded collision checks */
                if (bullet.IsInPlay) {
                    if (bullet.Owner === "enemy") {
                        _this._player.checkIntersection(bullet);
                    }
                    else if (bullet.Owner === "player") {
                        _this._enemies.forEach(function (enemy) {
                            if (enemy.Health > 0) {
                                enemy.checkIntersectionNotCentered(bullet);
                            }
                        });
                    }
                }
            });
        };
        Level1.prototype.Main = function () {
            var _this = this;
            this.addChild(this._space);
            //Set up number of enemies to kill in this level
            managers.Game.scoreBoard.RemainingEnemies = this._startingEnemies;
            managers.Game.scoreBoard.AddGameUI(this);
            this.addChild(this._player);
            //Add each bullet in the array to the scene
            this._bulletManager.Bullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
        };
        return Level1;
    }(objects.Scene));
    scenes.Level1 = Level1;
})(scenes || (scenes = {}));
//# sourceMappingURL=level1.js.map