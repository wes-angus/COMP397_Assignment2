module objects {
    export class Player extends objects.GameObject {

        //constructors
        constructor(y: number = 435) {
            super("plane", true);
            this.y = y;

            this.Start();
        }

        //private methods


        //public methods
        public Reset(): void {

        }
        public Destroy(): void {

        }
        public Start(): void {
            
        }
        public Update(): void {
            this.x = managers.Game.stage.mouseX;

            if (this.x > 640 - this.HalfWidth) {
                this.x = 640 - this.HalfWidth;
            }
            else if (this.x < this.HalfWidth) {
                this.x = this.HalfWidth;
            }

            this._updatePosition();
        }
    }
}