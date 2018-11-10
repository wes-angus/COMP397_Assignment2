module objects {
    export class Enemy extends objects.GameObject {
        //private inst. vars
        private _horizontalSpeed: number;
        private _bulletSpawn: util.Vector2;
        private _health: number;
        private _origHealth: number;
        private _shootFrame: number = 0;
        private _shotDelay: number;

        //public props
        get Health(): number {
            return this._health;
        }
        set Health(newHealth: number) {
            this._health = newHealth;
            if (this._health === 0) {
                this.Destroy();
            }
        }

        //constructor
        constructor(health: number = 2, shotDelay: number = 20) {
            super("enemy", true);
            this.rotation = 180;
            this._origHealth = health;
            this._shotDelay = shotDelay;

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

            if ((this.x < 720 + this.HalfHeight)) {
                if (createjs.Ticker.getTicks() > this._shootFrame) {
                    this._shootFrame = createjs.Ticker.getTicks() + this._shotDelay;
                    managers.Game.bulletManager.FireBullet(
                        util.Vector2.Add(this.Position, this._bulletSpawn),
                        util.Vector2.left(), "enemy"
                    );
                }
            }
        }

        //public methods
        public Reset(): void {
            this._horizontalSpeed = -(Math.floor(Math.random() * 2) + 6);
            this.x = 720 + this.Width * Math.floor(Math.random() * 5) + 5;
            this.y = Math.floor(Math.random() * (480 - this.Height) + this.HalfHeight);
            this.Health = this._origHealth;
            this.IsColliding = false;
            this._updatePosition();
            this.alpha = 1;
        }
        public Destroy(): void {
            console.log("Killed Enemy!");
            managers.Game.scoreBoard.Score += 100;
            managers.Game.scoreBoard.RemainingEnemies--;
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