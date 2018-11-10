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
    var Player = /** @class */ (function (_super) {
        __extends(Player, _super);
        //constructors
        function Player(x, y) {
            if (x === void 0) { x = 45; }
            if (y === void 0) { y = 240; }
            var _this = _super.call(this, "tank", true) || this;
            _this.x = x;
            _this.y = y;
            _this.Start();
            return _this;
        }
        //private methods
        //public methods
        Player.prototype.Reset = function () {
        };
        Player.prototype.Destroy = function () {
        };
        Player.prototype.Start = function () {
        };
        Player.prototype.Update = function () {
            if (this.y > 480 - this.HalfHeight) {
                this.y = 480 - this.HalfHeight;
            }
            else if (this.y < this.HalfHeight) {
                this.y = this.HalfHeight;
            }
            /*
            if (this.x > 720 - this.HalfWidth) {
                this.x = 720 - this.HalfWidth;
            }
            else if (this.x < this.HalfWidth) {
                this.x = this.HalfWidth;
            }
            */
            this._updatePosition();
        };
        return Player;
    }(objects.GameObject));
    objects.Player = Player;
})(objects || (objects = {}));
//# sourceMappingURL=player.js.map