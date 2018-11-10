var managers;
(function (managers) {
    var ScoreBoard = /** @class */ (function () {
        //constructor
        function ScoreBoard(livesNum, scoreNum, highScoreNum) {
            if (livesNum === void 0) { livesNum = 5; }
            if (scoreNum === void 0) { scoreNum = 0; }
            if (highScoreNum === void 0) { highScoreNum = 0; }
            this.Start();
            this.Lives = livesNum;
            this.Score = scoreNum;
            this.HighScore = highScoreNum;
        }
        Object.defineProperty(ScoreBoard.prototype, "Score", {
            //public props
            get: function () {
                return this._score;
            },
            set: function (newVal) {
                this._score = newVal;
                this._scoreLabel.text = "Score: " + this._score;
                /*
                if(this._score > this._highScore)
                {
                    this.HighScore = this._score;
                }
                */
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "Lives", {
            get: function () {
                return this._lives;
            },
            set: function (newVal) {
                this._lives = newVal;
                this._livesLabel.text = "Lives: " + this._lives;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ScoreBoard.prototype, "HighScore", {
            get: function () {
                return this._highScore;
            },
            set: function (newVal) {
                this._highScore = newVal;
                this._highScoreLabel.text = "High Score: " + this._highScore;
            },
            enumerable: true,
            configurable: true
        });
        //private methods
        //public methods
        ScoreBoard.prototype.Reset = function (livesNum, scoreNum) {
            if (livesNum === void 0) { livesNum = 5; }
            if (scoreNum === void 0) { scoreNum = 0; }
            this.Lives = livesNum;
            this.Score = scoreNum;
        };
        ScoreBoard.prototype.AddGameUI = function (curScene) {
            curScene.addChild(this._scoreLabel);
            curScene.addChild(this._livesLabel);
        };
        ScoreBoard.prototype.AddHighScore = function (curScene) {
            curScene.addChild(this._highScoreLabel);
        };
        ScoreBoard.prototype.Start = function () {
            this._scoreLabel = new objects.Label("Score: 99999", "30px", "Consolas", "#FFFF00", 350, 10, false);
            this._livesLabel = new objects.Label("Lives: 99", "30px", "Consolas", "#FFFF00", 20, 10, false);
            this._highScoreLabel = new objects.Label("High Score: 999999", "60px", "Consolas", "#FFFF00", 320, 140, true);
        };
        return ScoreBoard;
    }());
    managers.ScoreBoard = ScoreBoard;
})(managers || (managers = {}));
//# sourceMappingURL=scoreboard.js.map