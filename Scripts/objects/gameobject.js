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
//Main game object class
var objects;
(function (objects) {
    var GameObject = /** @class */ (function (_super) {
        __extends(GameObject, _super);
        //constructors
        function GameObject(imageName, isCentered) {
            var _this = _super.call(this, managers.Game.assetManager.getResult(imageName)) || this;
            _this.name = imageName;
            _this._init(isCentered);
            return _this;
        }
        Object.defineProperty(GameObject.prototype, "IsColliding", {
            //public props
            get: function () {
                return this._isColliding;
            },
            set: function (newVal) {
                this._isColliding = newVal;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "Width", {
            get: function () {
                return this._width;
            },
            set: function (newVal) {
                this._width = newVal;
                this._halfWidth = newVal * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "HalfWidth", {
            get: function () {
                return this._halfWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "Height", {
            get: function () {
                return this._height;
            },
            set: function (newVal) {
                this._height = newVal;
                this._halfHeight = newVal * 0.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "HalfHeight", {
            get: function () {
                return this._halfWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(GameObject.prototype, "Position", {
            get: function () {
                return this._position;
            },
            set: function (newPos) {
                this._position = newPos;
            },
            enumerable: true,
            configurable: true
        });
        //private methods
        GameObject.prototype._init = function (isCentered) {
            this.Width = this.getBounds().width;
            this.Height = this.getBounds().height;
            this.Position = new util.Vector2(this.x, this.y);
            this.IsColliding = false;
            if (isCentered) {
                this.regX = this.HalfWidth;
                this.regY = this.HalfHeight;
            }
        };
        GameObject.prototype._updatePosition = function () {
            this.Position.x = this.x;
            this.Position.y = this.y;
        };
        GameObject.prototype.resolveCollision = function (other) {
            other.IsColliding = true;
        };
        //Collision functions (AABB)
        //Assumes other object is centered
        GameObject.prototype.checkIntersection = function (other) {
            if (!other.IsColliding) {
                if (this.x - this.HalfWidth < other.x + other.HalfWidth &&
                    this.x + this.HalfWidth > other.x - other.HalfWidth &&
                    this.y - this.HalfHeight < other.y + other.HalfHeight &&
                    this.y + this.HalfHeight > other.y - other.HalfHeight) {
                    this.resolveCollision(other);
                }
            }
        };
        //Assumes other object is not centered
        GameObject.prototype.checkIntersectionNotCentered = function (other) {
            if (!other.IsColliding) {
                if (this.x - this.HalfWidth < other.x + other.Width &&
                    this.x + this.HalfWidth > other.x &&
                    this.y - this.HalfHeight < other.y + other.Height &&
                    this.y + this.HalfHeight > other.y) {
                    this.resolveCollision(other);
                }
            }
        };
        return GameObject;
    }(createjs.Bitmap));
    objects.GameObject = GameObject;
})(objects || (objects = {}));
//# sourceMappingURL=gameobject.js.map