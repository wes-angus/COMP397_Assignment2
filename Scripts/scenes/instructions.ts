module scenes {
    export class Instructions extends objects.Scene {
        //private inst. vars
        private _space: objects.Background;
        private _welcomeLbl: objects.Label;
        private _instructionLbl: objects.Label;
        private _menuBtn: objects.Button;
        private _nextBtn: objects.Button;
        private readonly _flavourText: string = "You are the developer of a new tank for the USA's \"Space Force\". "
            + "Your goal is to remotely pilot the tank against a number of Russian tanks to see how well it fares. "
            + "Destroy 20 tanks to clear the mission!\n";
        private readonly _controlsText: string = " Controls:\n WASD or arrow keys to move\n "
            + "E or Right Shift key to shoot";
        private _showControls: boolean;

        //public props
        get ShowControls(): boolean {
            return this._showControls;
        }
        set ShowControls(newVal: boolean) {
            this._showControls = newVal;
            if (this._showControls) {
                this._instructionLbl.text = this._controlsText;
            }
            else {
                this._instructionLbl.text = this._flavourText;
            }
        }

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
            this._welcomeLbl = new objects.Label("Instructions", "60px", "Consolas", "#FFFF00", 360, 60, true);
            this._instructionLbl = new objects.Label(this._flavourText, "30px", "Consolas", "#FFFF00", 360, 115, false);
            this._instructionLbl.lineWidth = 640;
            this._instructionLbl.lineHeight = 30;
            this._instructionLbl.textAlign = "center";
            this._nextBtn = new objects.Button("nextButton", 200, 460, true);
            this._menuBtn = new objects.Button("menuButton", 520, 460, true);

            this.Main();
        }
        public Update(): void {
            this._space.Update();
        }
        public Main(): void {
            this.addChild(this._space);
            this.addChild(this._welcomeLbl);
            this.addChild(this._instructionLbl);
            this.addChild(this._menuBtn);
            this.addChild(this._nextBtn);

            this._menuBtn.on("click", () => {
                managers.Game.curState = config.Scene.START;
            });
            this._nextBtn.on("click", () => {
                this.ShowControls = !this.ShowControls;
            });
        }
    }
}