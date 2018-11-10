module scenes {
    export class Start extends objects.Scene {
        //private inst. vars
        private _ocean: objects.Ocean;
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
            this._ocean = new objects.Ocean();
            this._welcomeLbl = new objects.Label("Mail Pilot", "60px", "Consolas", "#FFFF00", 320, 240, true);
            this._startBtn = new objects.Button("startButton", 320, 360, true);

            this.Main();
        }
        public Update(): void {
            this._ocean.Update();
        }
        public Main(): void {
            this.addChild(this._ocean);
            this.addChild(this._welcomeLbl);
            this.addChild(this._startBtn);

            this._startBtn.on("click", () => {
                managers.Game.curState = config.Scene.LEVEL1;
            });
        }
    }
}