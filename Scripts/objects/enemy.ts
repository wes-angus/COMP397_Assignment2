//Enemy class
module objects {
    export class Enemy extends objects.GameObject {
        //private inst. vars
        private _horizontalSpeed: number;
        private _verticalSpeed: number;
        private _bulletSpawn: util.Vector2;
        private _health: number;
        private _origHealth: number;
        private _shootFrame: number = 0;
        private _shotDelay: number;

        //public props
        get Health(): number {
            return this._health;
        }
        //Manage health of enemies and kill them if it drops to 0
        set Health(newHealth: number) {
            this._health = newHealth;
            if (this._health === 0) {
                this.Destroy();
            }
        }

        //constructor
        constructor(health: number = 2, shotDelay: number = 24) {
            super("enemy", true);
            this.rotation = 180;
            this._origHealth = health;
            this._shotDelay = shotDelay;

            this.Start();
        }

        //private methods
        //Handle enemy-bullet collisions
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
            this.y += this._verticalSpeed;
            this._updatePosition();
        }
        //Bounce back or reset the player if it hits the edge of the screen
        _checkBounds(): void {
            if (this.x < -this.Width) {
                this.Reset();
            }
            if (this.y < this.HalfHeight) {
                this.y = this.HalfHeight;
                this._verticalSpeed *= -1;
            }
            else if (this.y > 480 - this.HalfHeight) {
                this.y = 480 - this.HalfHeight;
                this._verticalSpeed *= -1;
            }

            //Fire bullet to the left if enemy is not dead, and enough time has passed since the last shot
            if (this.Health > 0) {
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
        }

        //public methods
        public Reset(): void {
            this._horizontalSpeed = -(Math.floor(Math.random() * 2) + 6);
            this._verticalSpeed = Math.floor(Math.random() * 4) - 2;
            this.x = 720 + this.Width * Math.floor(Math.random() * 6) + 5;
            this.y = Math.floor(Math.random() * (480 - this.Height) + this.HalfHeight);
            this.Health = this._origHealth;
            this.IsColliding = false;
            this._updatePosition();
            this.alpha = 1;
        }
        //Increase score and update number of remaining enemies upon death 
        public Destroy(): void {
            console.log("Killed Enemy!");
            managers.Game.scoreBoard.Score += 150;
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