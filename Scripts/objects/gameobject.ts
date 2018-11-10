module objects {
    export abstract class GameObject extends createjs.Bitmap {
        //private inst. vars
        private _width: number;
        private _height: number;
        private _halfWidth: number;
        private _halfHeight: number;
        private _position: util.Vector2;
        private _isColliding: boolean;

        //public props
        get IsColliding(): boolean {
            return this._isColliding;
        }
        set IsColliding(newVal: boolean) {
            this._isColliding = newVal;
        }

        get Width(): number {
            return this._width;
        }
        set Width(newVal: number) {
            this._width = newVal;
            this._halfWidth = newVal * 0.5;
        }
        get HalfWidth() {
            return this._halfWidth;
        }

        get Height(): number {
            return this._height;
        }
        set Height(newVal: number) {
            this._height = newVal;
            this._halfHeight = newVal * 0.5;
        }
        get HalfHeight() {
            return this._halfWidth;
        }

        get Position(): util.Vector2 {
            return this._position;
        }
        set Position(newPos: util.Vector2) {
            this._position = newPos;
        }

        //constructors
        constructor(imageName: string, isCentered: boolean) {
            super(managers.Game.assetManager.getResult(imageName));
            this.name = imageName;

            this._init(isCentered);
        }

        //private methods
        private _init(isCentered: boolean): void {
            this.Width = this.getBounds().width;
            this.Height = this.getBounds().height;
            this.Position = new util.Vector2(this.x, this.y);
            this.IsColliding = false;

            if (isCentered) {
                this.regX = this.HalfWidth;
                this.regY = this.HalfHeight;
            }
        }

        protected _updatePosition(): void {
            this.Position.x = this.x;
            this.Position.y = this.y;
        }

        private resolveCollision(other: GameObject): void {
            other.IsColliding = true;
            let sound: createjs.AbstractSoundInstance;

            switch (other.name) {
                case "island":
                    sound = createjs.Sound.play("yaySound", { volume: 0.1 });
                    managers.Game.scoreBoard.Score += 100;
                    break;
                case "enemy":
                    sound = createjs.Sound.play("explodeSound", { volume: 0.1 });
                    managers.Game.scoreBoard.Lives--;
                    break;
                case "bullet":
                    sound = createjs.Sound.play("explodeSound", { volume: 0.1 });
                    managers.Game.scoreBoard.Lives--;
                    (<Bullet>other).IsInPlay = false;
                    break;
            }

            if (managers.Game.scoreBoard.Lives < 1) {
                managers.Game.curState = config.Scene.OVER;
                if (managers.Game.scoreBoard.Score > managers.Game.scoreBoard.HighScore) {
                    managers.Game.scoreBoard.HighScore = managers.Game.scoreBoard.Score;
                }
            }
        }

        //Collision functions assume object checking against others (e.g. player) is centered
        //Assumes other object is centered
        public checkIntersection(other: GameObject): void {
            if (!other.IsColliding) {
                if (this.x - this.HalfWidth < other.x + other.HalfWidth &&
                    this.x + this.HalfWidth > other.x - other.HalfWidth &&
                    this.y - this.HalfHeight < other.y + other.HalfHeight &&
                    this.y + this.HalfHeight > other.y - other.HalfHeight) {
                    this.resolveCollision(other);
                }
            }
        }
        //Assumes other object is not centered
        public checkIntersectionNotCentered(other: GameObject): void {
            if (!other.IsColliding) {
                if (this.x - this.HalfWidth < other.x + other.Width &&
                    this.x + this.HalfWidth > other.x &&
                    this.y - this.HalfHeight < other.y + other.Height &&
                    this.y + this.HalfHeight > other.y) {
                    this.resolveCollision(other);
                }
            }
        }

        public checkCollision(object2: objects.GameObject): void {
            if (!object2.IsColliding) {
                let distance = util.Vector2.Dist(this.Position, object2.Position);
                let totalHeight = this.HalfHeight + object2.HalfHeight;

                // check if this object is colliding with object 2
                if (distance < totalHeight) {
                    this.resolveCollision(object2);
                }
            }
        }

        //public methods
        public abstract Reset(): void;

        public abstract Start(): void;

        public abstract Update(): void;

        public abstract Destroy(): void;
    }
}