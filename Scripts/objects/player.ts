module objects {
    export class Player extends objects.GameObject {

        //constructors
        constructor(x: number = 45, y: number = 240) {
            super("tank", true);
            this.x = x;
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
            if (this.y > 480 - this.HalfHeight) {
                this.y = 480 - this.HalfHeight;
            }
            else if (this.y < this.HalfHeight) {
                this.y = this.HalfHeight;
            }
            /*
            if (this.x > 720 - this.HalfWidth) {
                this.x = 720 - this.HalfWidth;
            }
            else if (this.x < this.HalfWidth) {
                this.x = this.HalfWidth;
            }
            */

            this._updatePosition();
        }
    }
}