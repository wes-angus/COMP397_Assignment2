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
    var Over = /** @class */ (function (_super) {
        __extends(Over, _super);
        //public props
        //constructor
        function Over() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        //private methods
        //public methods
        Over.prototype.Reset = function () {
        };
        Over.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        Over.prototype.Start = function () {
            this._space = new objects.Background();
            this._gameOverLbl = new objects.Label("Game Over", "60px", "Consolas", "#FFFF00", 365, 160, true);
            if (managers.Game.scoreBoard.Win) {
                this._gameOverLbl.text = "You Win!!";
            }
            this._restartBtn = new objects.Button("restartButton", 360, 340, true);
            this._menuBtn = new objects.Button("menuButton", 360, 440, true);
            this.Main();
        };
        Over.prototype.Update = function () {
        };
        Over.prototype.Main = function () {
            this.addChild(this._space);
            this.addChild(this._gameOverLbl);
            this.addChild(this._restartBtn);
            this.addChild(this._menuBtn);
            this._restartBtn.on("click", function () {
                managers.Game.curState = config.Scene.LEVEL1;
                managers.Game.scoreBoard.Reset();
            });
            this._menuBtn.on("click", function () {
                managers.Game.curState = config.Scene.START;
                managers.Game.scoreBoard.Reset();
            });
            managers.Game.scoreBoard.AddHighScore(this);
        };
        return Over;
    }(objects.Scene));
    scenes.Over = Over;
})(scenes || (scenes = {}));
//# sourceMappingURL=over.js.map