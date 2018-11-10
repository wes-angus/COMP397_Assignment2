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
var util;
(function (util) {
    var Vector2 = /** @class */ (function (_super) {
        __extends(Vector2, _super);
        //private inst. vars
        //public props
        //constructor
        function Vector2(x, y) {
            if (x === void 0) { x = 0; }
            if (y === void 0) { y = 0; }
            return _super.call(this, x, y) || this;
        }
        //public methods
        /**
         *This method returns the Euclidian distance between 2 vectors
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {util.Vector2} vec2
         * @returns {number}
         * @memberof Vector2
         */
        Vector2.Dist = function (vec1, vec2) {
            return Math.floor(Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2)));
        };
        /**
         * Adds 2 vectors
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {util.Vector2} vec2
         * @returns {util.Vector2}
         * @memberof Vector2
         */
        Vector2.Add = function (vec1, vec2) {
            var result = new util.Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
            return result;
        };
        /**
         * Subtracts a 2nd vector from an initial vector
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {util.Vector2} vec2
         * @returns {util.Vector2}
         * @memberof Vector2
         */
        Vector2.Sub = function (vec1, vec2) {
            var result = new util.Vector2(vec1.x - vec2.x, vec1.y - vec2.y);
            return result;
        };
        /**
         * Multiplies a vector by a number
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {number} factor
         * @returns {util.Vector2}
         * @memberof Vector2
         */
        Vector2.Mult = function (vec1, factor) {
            return new util.Vector2(vec1.x * factor, vec1.y * factor);
        };
        /**
         * Divides a vector by a number
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {number} factor
         * @returns {util.Vector2}
         * @memberof Vector2
         */
        Vector2.Div = function (vec1, factor) {
            return new util.Vector2(vec1.x / factor, vec1.y / factor);
        };
        // Convenience Methods
        Vector2.up = function () {
            return new Vector2(0, -1);
        };
        Vector2.down = function () {
            return new Vector2(0, 1);
        };
        Vector2.right = function () {
            return new Vector2(1, 0);
        };
        Vector2.left = function () {
            return new Vector2(-1, 0);
        };
        Vector2.zero = function () {
            return new Vector2();
        };
        return Vector2;
    }(createjs.Point));
    util.Vector2 = Vector2;
})(util || (util = {}));
//# sourceMappingURL=vector2.js.map