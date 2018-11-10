module objects {
    export class Island extends objects.GameObject {
        //private inst. vars
        private _verticalSpeed: number;
        private 

        //public props

        //constructor
        constructor() {
            super("island", false);

            this.Start();
        }

        //private methods
        _move(): void {
            this.y += this._verticalSpeed;
            this._updatePosition();
        }
        _checkBounds(): void {
            if (this.y > 480 + this.Height) {
                this.Reset();
            }
        }

        //public methods
        public Reset(): void {
            this._verticalSpeed = 5;
            this.y = -this.Height;
            this.x = Math.floor(Math.random() * (640 - this.Width) + this.HalfWidth);
            this.IsColliding = false;
        }
        public Destroy(): void {

        }
        public Start(): void {
            this.Reset();
        }
        public Update(): void {
            this._move();
            this._checkBounds();
        }
    }
}