module managers {
    export class ScoreBoard {
        //private vars
        private _score: number;
        private _lives: number;
        private _coins: number;
        private _highScore: number;
        private _remainingEnemies: number;
        private _win: boolean;

        private _scoreLabel: objects.Label;
        private _livesLabel: objects.Label;
        private _coinsLabel: objects.Label;
        private _highScoreLabel: objects.Label;
        private _enemiesLabel: objects.Label;

        //public props
        get Score(): number {
            return this._score;
        }
        set Score(newVal: number) {
            this._score = newVal;
            this._scoreLabel.text = "Score: " + this._score;
        }

        get Lives(): number {
            return this._lives;
        }
        set Lives(newVal: number) {
            this._lives = newVal;
            this._livesLabel.text = "Lives: " + this._lives;
        }

        get Coins(): number {
            return this._coins;
        }
        set Coins(newVal: number) {
            this._coins = newVal;
            this._coinsLabel.text = "Coins: " + this._coins;
        }

        get HighScore(): number {
            return this._highScore;
        }
        set HighScore(newVal: number) {
            this._highScore = newVal;
            this._highScoreLabel.text = "High Score: " + this._highScore;
        }

        get RemainingEnemies(): number {
            return this._remainingEnemies;
        }
        set RemainingEnemies(newVal: number) {
            this._remainingEnemies = newVal;
            this._enemiesLabel.text = "Remaining: " + this._remainingEnemies;
            if (this._remainingEnemies < 1) {
                managers.Game.scoreBoard.Score += 5000;
                managers.Game.scoreBoard.Score += this.Coins * 100;
                this.Coins = 0;
                this._win = true;
                managers.Game.curState = config.Scene.OVER;
                if (managers.Game.scoreBoard.Score > managers.Game.scoreBoard.HighScore) {
                    managers.Game.scoreBoard.HighScore = managers.Game.scoreBoard.Score;
                }
            }
        }

        get Win(): boolean {
            return this._win;
        }

        //constructor
        constructor(livesNum: number = 5, scoreNum: number = 0, highScoreNum: number = 0) {
            this.Start();

            this.Lives = livesNum;
            this.Score = scoreNum;
            this.Coins = scoreNum;
            this.HighScore = highScoreNum;
            this._remainingEnemies = 99;
        }

        //private methods

        //public methods
        public Reset(livesNum: number = 5, scoreNum: number = 0) {
            this.Lives = livesNum;
            this.Score = scoreNum;
            this.Coins %= 25;
        }

        public AddGameUI(curScene: objects.Scene): void {
            curScene.addChild(this._scoreLabel);
            curScene.addChild(this._livesLabel);
            curScene.addChild(this._coinsLabel);
            curScene.addChild(this._enemiesLabel);
        }

        public AddHighScore(curScene: objects.Scene): void {
            curScene.addChild(this._highScoreLabel);
        }

        public Start(): void {
            this._scoreLabel = new objects.Label("Score: 99999", "30px", "Consolas", "#FFFF00", 250, 10, false);
            this._livesLabel = new objects.Label("Lives: 99", "30px", "Consolas", "#FFFF00", 20, 10, false);
            this._coinsLabel = new objects.Label("Coins: 99", "30px", "Consolas", "#FFFF00", 540, 10, false);
            this._enemiesLabel = new objects.Label("Remaining: 99", "30px", "Consolas", "#FFFF00", 300, 430, false);
            this._highScoreLabel = new objects.Label("High Score: 999999", "60px", "Consolas", "#FFFF00", 360, 120, true);
        }
    }
}