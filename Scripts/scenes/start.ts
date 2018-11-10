module scenes {
    export class Start extends objects.Scene {
        //private inst. vars
        private _space: objects.Background;
        private _welcomeLbl: objects.Label;
        private _startBtn: objects.Button;
        private _howToBtn: objects.Button;
        private _exitBtn: objects.Button;

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
            this._welcomeLbl = new objects.Label("Tortuga no Sensō: War in Space", "60px", "Consolas", "#FFFF00", 360, 80, false);
            this._welcomeLbl.lineWidth = 640;
            this._welcomeLbl.lineHeight = 60;
            this._welcomeLbl.textAlign = "center";
            this._startBtn = new objects.Button("startButton", 220, 350, true);
            this._howToBtn = new objects.Button("howToButton", 500, 350, true);
            this._exitBtn = new objects.Button("exitButton", 360, 450, true);

            this.Main();
        }
        public Update(): void {
            this._space.Update();
        }
        public Main(): void {
            this.addChild(this._space);
            this.addChild(this._welcomeLbl);
            this.addChild(this._startBtn);
            this.addChild(this._howToBtn);
            this.addChild(this._exitBtn);

            this._startBtn.on("click", () => {
                managers.Game.curState = config.Scene.LEVEL1;
            });
            this._howToBtn.on("click", () => {
                managers.Game.curState = config.Scene.INSTRUCTIONS;
            });
            this._exitBtn.on("click", () => {
                managers.Game.curState = config.Scene.OVER;
            });
        }
    }
}