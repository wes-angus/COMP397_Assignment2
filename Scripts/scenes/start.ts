module scenes {
    export class Start extends objects.Scene {
        //private inst. vars
        private _space: objects.Background;
        private _welcomeLbl: objects.Label;
        private _startBtn: objects.Button;

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
            this._welcomeLbl = new objects.Label("Tortuga no Sensō: War in Space", "60px", "Consolas", "#FFFF00", 340, 150, false);
            this._welcomeLbl.lineWidth = 640;
            this._welcomeLbl.lineHeight = 60;
            this._welcomeLbl.textAlign = "center";
            this._startBtn = new objects.Button("startButton", 320, 360, true);

            this.Main();
        }
        public Update(): void {
            this._space.Update();
        }
        public Main(): void {
            this.addChild(this._space);
            this.addChild(this._welcomeLbl);
            this.addChild(this._startBtn);

            this._startBtn.on("click", () => {
                managers.Game.curState = config.Scene.LEVEL1;
            });
        }
    }
}