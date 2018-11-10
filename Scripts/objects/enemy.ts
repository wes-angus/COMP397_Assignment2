module objects {
    export class Enemy extends objects.GameObject {
        //private inst. vars
        private _verticalSpeed: number;
        private _bulletSpawn: util.Vector2;

        //public props

        //constructor
        constructor() {
            super("enemy", true);

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

            if ((createjs.Ticker.getTicks() % 20 == 0) && (this.y > 0)) {
                managers.Game.bulletManager.FireBullet(
                    util.Vector2.Add(this.Position, this._bulletSpawn),
                    util.Vector2.down()
                );
            }
        }

        //public methods
        public Reset(): void {
            this._verticalSpeed = Math.floor(Math.random() * 2) + 6;
            this.y = -this.Height * Math.floor(Math.random() * 10) + 5;
            this.x = Math.floor(Math.random() * (640 - this.Width) + this.HalfWidth);
            this.IsColliding = false;
            this._updatePosition();
        }
        public Destroy(): void {
        }
        public Start(): void {
            this._bulletSpawn = new util.Vector2(0, 3 + this.HalfHeight);
            this.Reset();
        }
        public Update(): void {
            this._move();
            this._checkBounds();
        }
    }
}