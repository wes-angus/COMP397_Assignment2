module objects {
    export class Enemy extends objects.GameObject {
        //private inst. vars
        private _horizontalSpeed: number;
        private _bulletSpawn: util.Vector2;

        //public props

        //constructor
        constructor() {
            super("enemy", true);
            this.rotation = 180;

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

            if ((createjs.Ticker.getTicks() % 20 == 0) && (this.x < 720 + this.Height)) {
                managers.Game.bulletManager.FireBullet(
                    util.Vector2.Add(this.Position, this._bulletSpawn),
                    util.Vector2.left()
                );
            }
        }

        //public methods
        public Reset(): void {
            this._horizontalSpeed = -(Math.floor(Math.random() * 2) + 6);
            this.x = 720 + this.Width * Math.floor(Math.random() * 10) + 5;
            this.y = Math.floor(Math.random() * (480 - this.Height) + this.HalfHeight);
            this.IsColliding = false;
            this._updatePosition();
        }
        public Destroy(): void {
        }
        public Start(): void {
            this._bulletSpawn = new util.Vector2(-5 - this.HalfWidth, 5);
            this.Reset();
        }
        public Update(): void {
            this._move();
            this._checkBounds();
        }
    }
}