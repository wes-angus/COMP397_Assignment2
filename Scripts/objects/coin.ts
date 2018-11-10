module objects {
    export class Coin extends objects.GameObject {
        //private inst. vars
        private _horizontalSpeed: number;
        private 

        //public props

        //constructor
        constructor() {
            super("coin", false);

            this.Start();
        }

        //private methods
        _move(): void {
            this.x += this._horizontalSpeed;
            this._updatePosition();
        }
        _checkBounds(): void {
            if (this.x < -this.Width) {
                this.Reset();
            }
        }

        //public methods
        public Reset(): void {
            this._horizontalSpeed = -5;
            this.x = 720 + this.Width;
            this.y = Math.floor(Math.random() * (480 - this.Height) + this.HalfHeight);
            this.IsColliding = false;
            this.alpha = 255;
        }
        public Destroy(): void {
            this.alpha = 0;
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