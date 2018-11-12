/**
 * Author: Wesley Angus
 * Student #: 300924221
 * Description: A tank-based, side-scrolling space shooter - 
 * see "Instructions" for more background and controls for the game.
 * Last Modified by: Wesley Angus
 * Date Last Modified: Nov 11 2018
 * Revision History: see https://github.com/wes-angus/COMP397_Assignment2
 */

module managers {
    export class ScoreBoard {
        //private vars
        private _score: number;
        private _lives: number;
        private _coins: number;
        private _highScore: number;
        private _remainingEnemies: number;
        private _win: boolean; //Check if the player has cleared the game

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
            managers.Cookie.setCookie("highScore", this._highScore); //Save high score in a cookie
            this._highScoreLabel.text = "High Score: " + this._highScore;
        }

        get RemainingEnemies(): number {
            return this._remainingEnemies;
        }
        set RemainingEnemies(newVal: number) {
            this._remainingEnemies = newVal;
            this._enemiesLabel.text = "Remaining: " + this._remainingEnemies;
            if (this._remainingEnemies < 1) {
                //If the player has won, add a bonus to their score
                managers.Game.scoreBoard.Score += 5000 + (this.Coins * 100) + (this.Lives * 1000);
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
        constructor(livesNum: number = 7, scoreNum: number = 0, highScoreNum: number = 0) {
            this.Start();

            this.Lives = livesNum;
            this.Score = scoreNum;
            this.Coins = scoreNum;
            this._initHighScore(highScoreNum);
            this._remainingEnemies = 99;
        }

        //private methods
        private _initHighScore(highScoreNum: number) {
            //Get high score from the cookie, or initialize it if no cookie is found
            let hsString: string = managers.Cookie.getCookie("highScore");
            if (hsString !== "") {
                this.HighScore = parseInt(hsString);
                console.log("Got high score: ", this.HighScore);
            }
            else {
                this.HighScore = highScoreNum;
            }
        }

        public Reset(livesNum: number = 7, scoreNum: number = 0) {
            this.Lives = livesNum;
            this.Score = scoreNum;
            this.Coins %= 25; //Keep some coins to make winning after death slightly easier
        }

        public AddGameUI(curScene: objects.Scene): void {
            //Add the UI to the main game scene
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
            this._enemiesLabel = new objects.Label("Remaining: 99", "30px", "Consolas", "#FFFF00", 360, 440, true);
            this._highScoreLabel = new objects.Label("High Score: 999999", "60px", "Consolas", "#FFFF00", 360, 80, true);
        }
    }
}