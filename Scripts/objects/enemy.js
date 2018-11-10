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
        //public props
        //constructor
        function Enemy() {
            var _this = _super.call(this, "enemy", true) || this;
            _this.rotation = 180;
            _this.Start();
            return _this;
        }
        //private methods
        Enemy.prototype._move = function () {
            this.x += this._horizontalSpeed;
            this._updatePosition();
        };
        Enemy.prototype._checkBounds = function () {
            if (this.x < -this.Width) {
                this.Reset();
            }
            if ((createjs.Ticker.getTicks() % 20 == 0) && (this.x < 720 + this.Height)) {
                managers.Game.bulletManager.FireBullet(util.Vector2.Add(this.Position, this._bulletSpawn), util.Vector2.left());
            }
        };
        //public methods
        Enemy.prototype.Reset = function () {
            this._horizontalSpeed = -(Math.floor(Math.random() * 2) + 6);
            this.x = 720 + this.Width * Math.floor(Math.random() * 10) + 5;
            this.y = Math.floor(Math.random() * (480 - this.Height) + this.HalfHeight);
            this.IsColliding = false;
            this._updatePosition();
        };
        Enemy.prototype.Destroy = function () {
        };
        Enemy.prototype.Start = function () {
            this._bulletSpawn = new util.Vector2(-5 - this.HalfWidth, 5);
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