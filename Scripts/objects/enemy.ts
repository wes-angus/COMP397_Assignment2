module objects {
    export class Enemy extends objects.GameObject {
        //private inst. vars
        private _horizontalSpeed: number;
        private _bulletSpawn: util.Vector2;
        private _health: number;
        private _origHealth: number;

        //public props
        get Health(): number {
            return this._health;
        }
        set Health(newHealth: number) {
            this._health = newHealth;
            if (this._health < 1) {
                this.Destroy();
            }
        }

        //constructor
        constructor(health: number = 3) {
            super("enemy", true);
            this.rotation = 180;
            this._origHealth = health;

            this.Start();
        }

        //private methods
        protected resolveCollision(other: GameObject): void {
            switch (other.name) {
                case "bullet":
                    createjs.Sound.play("explodeSound", { volume: 0.1 });
                    this.Health--;
                    managers.Game.scoreBoard.Score += 100;
                    (<Bullet>other).IsInPlay = false;
                    break;
            }
        }
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
            this.Health = this._origHealth;
            this.IsColliding = false;
            this._updatePosition();
            this.alpha = 255;
        }
        public Destroy(): void {
            managers.Game.scoreBoard.Score += 100;
            this.IsColliding = true;
            this.alpha = 0;
        }
        public Start(): void {
            this._bulletSpawn = new util.Vector2(-4 - this.HalfWidth, 4);
            this.Reset();
        }
        public Update(): void {
            this._move();
            this._checkBounds();
        }
    }
}