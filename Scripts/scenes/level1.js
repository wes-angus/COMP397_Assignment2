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
var scenes;
(function (scenes) {
    var Level1 = /** @class */ (function (_super) {
        __extends(Level1, _super);
        //public props
        //constructor
        function Level1() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        //private methods
        //public methods
        Level1.prototype.Reset = function () {
        };
        Level1.prototype.Destroy = function () {
            this.removeAllChildren();
            this._engineSound.stop();
            //TODO: Clean up bullet mananger
        };
        Level1.prototype.Start = function () {
            //Ocean background
            this._ocean = new objects.Ocean();
            //Player object
            this._player = new objects.Player();
            //Island object
            this._island = new objects.Island();
            //Enemy object
            this._enemy = new objects.Enemy();
            this._engineSound = createjs.Sound.play("engineSound", { volume: 0.1, loop: -1 });
            //Instantiate new bullet manager
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManager = this._bulletManager;
            this.Main();
        };
        Level1.prototype.Update = function () {
            var _this = this;
            this._ocean.Update();
            this._player.Update();
            this._island.Update();
            this._enemy.Update();
            this._player.checkIntersectionNotCentered(this._island);
            this._player.checkIntersection(this._enemy);
            this._bulletManager.Update();
            this._bulletManager.Bullets.forEach(function (bullet) {
                if (bullet.IsInPlay) {
                    _this._player.checkIntersection(bullet);
                }
            });
        };
        Level1.prototype.Main = function () {
            var _this = this;
            this.addChild(this._ocean);
            this.addChild(this._island);
            this.addChild(this._enemy);
            this.addChild(this._player);
            //Add each bullet in the array to the scene
            this._bulletManager.Bullets.forEach(function (bullet) {
                _this.addChild(bullet);
            });
            managers.Game.scoreBoard.AddGameUI(this);
        };
        return Level1;
    }(objects.Scene));
    scenes.Level1 = Level1;
})(scenes || (scenes = {}));
//# sourceMappingURL=level1.js.map