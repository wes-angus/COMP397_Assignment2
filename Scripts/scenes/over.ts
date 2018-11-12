//Game over scene class
module scenes {
    export class Over extends objects.Scene {
        //private inst. vars
        private _space: objects.Background;
        private _gameOverLbl: objects.Label;
        private _restartBtn: objects.Button;
        private _menuBtn: objects.Button;

        //public props

        //constructor
        constructor() {
            super();

            this.Start();
        }

        //private methods

        //public methods
        public Reset(): void {
        }
        public Destroy(): void {
            this.removeAllChildren();
        }
        public Start(): void {
            this._space = new objects.Background();
            this._gameOverLbl = new objects.Label("Game Over", "60px", "Consolas", "#FFFF00", 365, 160, true);
            if (managers.Game.scoreBoard.Win) {
                this._gameOverLbl.text = "You Win!!";
            }
            this._restartBtn = new objects.Button("restartButton", 360, 340, true);
            this._menuBtn = new objects.Button("menuButton", 360, 440, true);

            this.Main();
        }
        public Update(): void {
        }
        public Main(): void {
            this.addChild(this._space);
            this.addChild(this._gameOverLbl);
            this.addChild(this._restartBtn);
            this.addChild(this._menuBtn);

            //Restart level or go back to main menu on button click
            this._restartBtn.on("click", () => {
                managers.Game.curState = config.Scene.LEVEL1;
                managers.Game.scoreBoard.Reset();
            });
            this._menuBtn.on("click", () => {
                managers.Game.curState = config.Scene.START;
                managers.Game.scoreBoard.Reset();
            });

            managers.Game.scoreBoard.AddHighScore(this);
        }
    }
}