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
//Coin class
var objects;
(function (objects) {
    var Coin = /** @class */ (function (_super) {
        __extends(Coin, _super);
        //public props
        //constructor
        function Coin() {
            var _this = _super.call(this, "coin", false) || this;
            _this.Start();
            return _this;
        }
        //private methods
        Coin.prototype._move = function () {
            this.x += this._horizontalSpeed;
            this._updatePosition();
        };
        Coin.prototype._checkBounds = function () {
            if (this.x < -this.Width) {
                this.Reset();
            }
        };
        //public methods
        Coin.prototype.Reset = function () {
            this._horizontalSpeed = -5;
            this.x = 720 + this.Width;
            this.y = Math.floor(Math.random() * (480 - this.Height) + this.HalfHeight);
            this.IsColliding = false;
            this.alpha = 1;
        };
        Coin.prototype.Destroy = function () {
            this.alpha = 0;
        };
        Coin.prototype.Start = function () {
            this.Reset();
        };
        Coin.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        return Coin;
    }(objects.GameObject));
    objects.Coin = Coin;
})(objects || (objects = {}));
//# sourceMappingURL=coin.js.map