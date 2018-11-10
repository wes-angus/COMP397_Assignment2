var managers;
(function (managers) {
    var Bullet = /** @class */ (function () {
        //constructor
        function Bullet(bulletNum) {
            if (bulletNum === void 0) { bulletNum = 100; }
            this._bulletNum = bulletNum;
            this.Start();
        }
        Object.defineProperty(Bullet.prototype, "Bullets", {
            //public props
            get: function () {
                return this._bullets;
            },
            set: function (newBullets) {
                this._bullets = newBullets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bullet.prototype, "BulletNum", {
            get: function () {
                return this._bulletNum;
            },
            set: function (numOfBullets) {
                this._bulletNum = numOfBullets;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bullet.prototype, "CurrentBullet", {
            get: function () {
                return this._bullets[this._currentBulletIndex];
            },
            set: function (newBullet) {
                this._bullets[this._currentBulletIndex] = newBullet;
            },
            enumerable: true,
            configurable: true
        });
        //private methods
        Bullet.prototype._nextBullet = function () {
            this._currentBulletIndex++;
            if (this._currentBulletIndex >= this._bullets.length) {
                this._currentBulletIndex = 0;
            }
        };
        //public methods
        Bullet.prototype.Start = function () {
            //create the bullets array
            this._bullets = new Array();
            //fill up the bullets array
            for (var i = 0; i < this._bulletNum; i++) {
                this._bullets.push(new objects.Bullet());
            }
            this._currentBulletIndex = 0;
        };
        Bullet.prototype.Update = function () {
            this._bullets.forEach(function (bullet) {
                bullet.Update();
            });
        };
        Bullet.prototype.Destroy = function () {
        };
        Bullet.prototype.FireBullet = function (spawnPoint, dir, owner) {
            this.CurrentBullet.Position = spawnPoint;
            this.CurrentBullet.x = spawnPoint.x;
            this.CurrentBullet.y = spawnPoint.y;
            this.CurrentBullet.Direction = dir;
            this.CurrentBullet.IsInPlay = true;
            this.CurrentBullet.Owner = owner;
            createjs.Sound.play("bulletSound", { volume: 0.05 });
            this._nextBullet();
        };
        return Bullet;
    }());
    managers.Bullet = Bullet;
})(managers || (managers = {}));
//# sourceMappingURL=bullet.js.map