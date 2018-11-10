module objects {
    export class Background extends objects.GameObject {
        //private inst. vars
        private __horizontalSpeed: number = 0;

        //public props

        //constructor
        constructor() {
            super("space", false);

            this.Start();
        }

        //private methods
        _move(): void {
            this.x += this.__horizontalSpeed;
        }
        _checkBounds(): void {
            if (this.x <= -1920) {
                this.Reset();
            }
        }

        //public methods
        public Reset(): void {
            this.x = 0;
        }
        public Destroy(): void {

        }
        public Start(): void {
            this.Reset();
            this.__horizontalSpeed = -2; //2px per frame
        }
        public Update(): void {
            this._move();
            this._checkBounds();
        }
    }
}