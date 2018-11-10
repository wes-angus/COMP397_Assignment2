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
    var Start = /** @class */ (function (_super) {
        __extends(Start, _super);
        //public props
        //constructor
        function Start() {
            var _this = _super.call(this) || this;
            _this.Start();
            return _this;
        }
        //private methods
        //public methods
        Start.prototype.Reset = function () {
        };
        Start.prototype.Destroy = function () {
            this.removeAllChildren();
        };
        Start.prototype.Start = function () {
            this._space = new objects.Background();
            this._welcomeLbl = new objects.Label("Tortuga no Sensō: War in Space", "60px", "Consolas", "#FFFF00", 360, 80, false);
            this._welcomeLbl.lineWidth = 640;
            this._welcomeLbl.lineHeight = 60;
            this._welcomeLbl.textAlign = "center";
            this._startBtn = new objects.Button("startButton", 220, 350, true);
            this._howToBtn = new objects.Button("howToButton", 500, 350, true);
            this._exitBtn = new objects.Button("exitButton", 360, 450, true);
            this.Main();
        };
        Start.prototype.Update = function () {
            this._space.Update();
        };
        Start.prototype.Main = function () {
            this.addChild(this._space);
            this.addChild(this._welcomeLbl);
            this.addChild(this._startBtn);
            this.addChild(this._howToBtn);
            this.addChild(this._exitBtn);
            this._startBtn.on("click", function () {
                managers.Game.curState = config.Scene.LEVEL1;
            });
            this._howToBtn.on("click", function () {
                managers.Game.curState = config.Scene.INSTRUCTIONS;
            });
            this._exitBtn.on("click", function () {
                managers.Game.curState = config.Scene.OVER;
            });
        };
        return Start;
    }(objects.Scene));
    scenes.Start = Start;
})(scenes || (scenes = {}));
//# sourceMappingURL=start.js.map