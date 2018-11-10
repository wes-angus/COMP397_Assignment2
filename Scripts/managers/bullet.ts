module managers {
    export class Bullet {
        //private vars
        private _bullets: objects.Bullet[];
        private _bulletNum: number;
        private _currentBullet: objects.Bullet;
        private _currentBulletIndex: number;

        //public props
        get Bullets(): objects.Bullet[] {
            return this._bullets;
        }
        set Bullets(newBullets: objects.Bullet[]) {
            this._bullets = newBullets;
        }

        get BulletNum(): number {
            return this._bulletNum;
        }
        set BulletNum(numOfBullets: number) {
            this._bulletNum = numOfBullets;
        }

        get CurrentBullet(): objects.Bullet {
            return this._bullets[this._currentBulletIndex];
        }
        set CurrentBullet(newBullet: objects.Bullet) {
            this._bullets[this._currentBulletIndex] = newBullet;
        }

        //constructor
        constructor(bulletNum: number = 100) {
            this._bulletNum = bulletNum;
            this.Start();
        }

        //private methods

        //public methods
        public Start(): void {
            //create the bullets array
            this._bullets = new Array<objects.Bullet>();

            //fill up the bullets array
            for (let i = 0; i < this._bulletNum; i++) {
                this._bullets.push(new objects.Bullet());
            }

            this._currentBulletIndex = 0;
        }

        public Update(): void {
            this._bullets.forEach(bullet => {
                bullet.Update();
            });
        }

        public Destroy() {

        }

        public FireBullet(spawnPoint: util.Vector2, dir: util.Vector2): void {
            this.CurrentBullet.Position = spawnPoint;
            this.CurrentBullet.x = spawnPoint.x;
            this.CurrentBullet.y = spawnPoint.y;
            this.CurrentBullet.Direction = dir;
            this.CurrentBullet.IsInPlay = true;
            this._currentBulletIndex++;
            if(this._currentBulletIndex >= this._bullets.length) {
                this._currentBulletIndex = 0;
            }
        }
    }
}