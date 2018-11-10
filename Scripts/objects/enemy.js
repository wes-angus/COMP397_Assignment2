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
var objects;
(function (objects) {
    var Enemy = /** @class */ (function (_super) {
        __extends(Enemy, _super);
        //constructor
        function Enemy(health, shotDelay) {
            if (health === void 0) { health = 2; }
            if (shotDelay === void 0) { shotDelay = 24; }
            var _this = _super.call(this, "enemy", true) || this;
            _this._shootFrame = 0;
            _this.rotation = 180;
            _this._origHealth = health;
            _this._shotDelay = shotDelay;
            _this.Start();
            return _this;
        }
        Object.defineProperty(Enemy.prototype, "Health", {
            //public props
            get: function () {
                return this._health;
            },
            set: function (newHealth) {
                this._health = newHealth;
                if (this._health === 0) {
                    this.Destroy();
                }
            },
            enumerable: true,
            configurable: true
        });
        //private methods
        Enemy.prototype.resolveCollision = function (other) {
            switch (other.name) {
                case "bullet":
                    createjs.Sound.play("explodeSound", { volume: 0.1 });
                    this.Health--;
                    managers.Game.scoreBoard.Score += 100;
                    other.IsInPlay = false;
                    break;
            }
        };
        Enemy.prototype._move = function () {
            this.x += this._horizontalSpeed;
            this.y += this._verticalSpeed;
            this._updatePosition();
        };
        Enemy.prototype._checkBounds = function () {
            if (this.x < -this.Width) {
                this.Reset();
            }
            if (this.y < this.HalfHeight) {
                this.y = this.HalfHeight;
                this._verticalSpeed *= -1;
            }
            else if (this.y > 480 - this.HalfHeight) {
                this.y = 480 - this.HalfHeight;
                this._verticalSpeed *= -1;
            }
            if ((this.x < 720 + this.HalfHeight)) {
                if (createjs.Ticker.getTicks() > this._shootFrame) {
                    this._shootFrame = createjs.Ticker.getTicks() + this._shotDelay;
                    managers.Game.bulletManager.FireBullet(util.Vector2.Add(this.Position, this._bulletSpawn), util.Vector2.left(), "enemy");
                }
            }
        };
        //public methods
        Enemy.prototype.Reset = function () {
            this._horizontalSpeed = -(Math.floor(Math.random() * 2) + 6);
            this._verticalSpeed = Math.floor(Math.random() * 4) - 2;
            this.x = 720 + this.Width * Math.floor(Math.random() * 6) + 5;
            this.y = Math.floor(Math.random() * (480 - this.Height) + this.HalfHeight);
            this.Health = this._origHealth;
            this.IsColliding = false;
            this._updatePosition();
            this.alpha = 1;
        };
        Enemy.prototype.Destroy = function () {
            console.log("Killed Enemy!");
            managers.Game.scoreBoard.Score += 150;
            managers.Game.scoreBoard.RemainingEnemies--;
            this.IsColliding = true;
            this.alpha = 0;
        };
        Enemy.prototype.Start = function () {
            this._bulletSpawn = new util.Vector2(-4 - this.HalfWidth, 4);
            this.Reset();
        };
        Enemy.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        return Enemy;
    }(objects.GameObject));
    objects.Enemy = Enemy;
})(objects || (objects = {}));
//# sourceMappingURL=enemy.js.map