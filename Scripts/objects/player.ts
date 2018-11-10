module objects {
    export class Player extends objects.GameObject {
        private _moveStep: number;
        private _bulletSpawn: util.Vector2;
        private _shootFrame: number = 0;
        private _shotDelay: number;
        private _invincible: boolean;
        private _invincibleFrame: number;
        private _invincibleDelay: number;

        //constructors
        constructor(x: number = 45, y: number = 240, moveStep: number = 8, shotDelay: number = 10, invincibleDelay: number = 120) {
            super("tank", true);
            this.x = x;
            this.y = y;
            this._moveStep = moveStep;
            this._shotDelay = shotDelay;
            this._invincibleDelay = invincibleDelay;

            this.Start();
        }

        //private methods
        private takeDamage(): void {
            createjs.Sound.play("explodeSound", { volume: 0.1 });
            managers.Game.scoreBoard.Lives--;
            this._invincible = true;
            this.alpha = 0.5;
            this._invincibleFrame = createjs.Ticker.getTicks() + this._invincibleDelay;
        }
        protected resolveCollision(other: GameObject): void {
            if (!this._invincible || other.name === "coin") {
                super.resolveCollision(other);
            }

            switch (other.name) {
                case "coin":
                    createjs.Sound.play("coinSound", { volume: 0.1 });
                    managers.Game.scoreBoard.Score += 50;
                    other.Destroy();
                    managers.Game.scoreBoard.Coins++;
                    if (managers.Game.scoreBoard.Coins % 25 === 0) {
                        managers.Game.scoreBoard.Lives++;
                        createjs.Sound.play("lifeSound", { volume: 0.1 });
                    }
                    else {
                    }
                    break;
                case "enemy":
                    if (!this._invincible) {
                        this.takeDamage();
                    }
                    break;
                case "bullet":
                    if (!this._invincible) {
                        (<Bullet>other).IsInPlay = false;
                        this.takeDamage();
                    }
                    break;
            }

            if (managers.Game.scoreBoard.Lives < 1) {
                managers.Game.curState = config.Scene.OVER;
                if (managers.Game.scoreBoard.Score > managers.Game.scoreBoard.HighScore) {
                    managers.Game.scoreBoard.HighScore = managers.Game.scoreBoard.Score;
                }
            }
        }

        private _handleInput() {
            if (managers.Input.isKeydown(config.INPUT_KEY[0][config.ActionEnum.Up])) {
                this.y -= this._moveStep;
            }
            else if (managers.Input.isKeydown(config.INPUT_KEY[1][config.ActionEnum.Up])) {
                this.y -= this._moveStep / 2;
            }
            if (managers.Input.isKeydown(config.INPUT_KEY[0][config.ActionEnum.Down])) {
                this.y += this._moveStep;
            }
            else if (managers.Input.isKeydown(config.INPUT_KEY[1][config.ActionEnum.Down])) {
                this.y += this._moveStep / 2;
            }

            if (managers.Input.isKeydown(config.INPUT_KEY[0][config.ActionEnum.Left])) {
                this.x -= this._moveStep / 2;
            }
            else if (managers.Input.isKeydown(config.INPUT_KEY[1][config.ActionEnum.Left])) {
                this.x -= this._moveStep / 4;
            }
            if (managers.Input.isKeydown(config.INPUT_KEY[0][config.ActionEnum.Right])) {
                this.x += this._moveStep / 2;
            }
            else if (managers.Input.isKeydown(config.INPUT_KEY[1][config.ActionEnum.Right])) {
                this.x += this._moveStep / 4;
            }

            if (createjs.Ticker.getTicks() > this._shootFrame) {
                if (managers.Input.isKeydown(config.INPUT_KEY[0][config.ActionEnum.Shoot]) ||
                    managers.Input.isKeydown(config.INPUT_KEY[1][config.ActionEnum.Shoot])) {
                    managers.Game.bulletManager.FireBullet(
                        util.Vector2.Add(this.Position, this._bulletSpawn),
                        util.Vector2.right(), "player"
                    );
                    this._shootFrame = createjs.Ticker.getTicks() + this._shotDelay;
                }
            }

            if (this.y > 480 - this.HalfHeight + 8) {
                this.y = 480 - this.HalfHeight + 8;
            }
            else if (this.y < this.HalfHeight) {
                this.y = this.HalfHeight;
            }
            if (this.x > 720 - this.HalfWidth) {
                this.x = 720 - this.HalfWidth;
            }
            else if (this.x < this.HalfWidth) {
                this.x = this.HalfWidth;
            }
        }

        //public methods
        public Reset(): void {

        }
        public Destroy(): void {

        }
        public Start(): void {
            this._bulletSpawn = new util.Vector2(4 + this.HalfWidth, -4);
        }
        public Update(): void {
            if (this._invincible) {
                if (createjs.Ticker.getTicks() > this._invincibleFrame) {
                    this.alpha = 1;
                    this._invincible = false;
                }
            }
            this._handleInput();
            this._updatePosition();
        }
    }
}