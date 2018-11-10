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
    var Ocean = /** @class */ (function (_super) {
        __extends(Ocean, _super);
        //public props
        //constructor
        function Ocean() {
            var _this = _super.call(this, "ocean_h", false) || this;
            //private inst. vars
            _this.__horizontalSpeed = 0;
            _this.Start();
            return _this;
        }
        //private methods
        Ocean.prototype._move = function () {
            this.x += this.__horizontalSpeed;
        };
        Ocean.prototype._checkBounds = function () {
            if (this.x <= -1440) {
                this.Reset();
            }
        };
        //public methods
        Ocean.prototype.Reset = function () {
            this.x = 0;
        };
        Ocean.prototype.Destroy = function () {
        };
        Ocean.prototype.Start = function () {
            this.Reset();
            this.__horizontalSpeed = -5; //5px per frame
        };
        Ocean.prototype.Update = function () {
            this._move();
            this._checkBounds();
        };
        return Ocean;
    }(objects.GameObject));
    objects.Ocean = Ocean;
})(objects || (objects = {}));
//# sourceMappingURL=ocean.js.map