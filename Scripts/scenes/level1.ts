module scenes {
    export class Level1 extends objects.Scene {
        //private inst. vars
        //Game objects
        private _player: objects.Player;
        private _ocean: objects.Ocean;
        private _coins: objects.Coin[];
        private _enemy: objects.Enemy;
        private _engineSound: createjs.AbstractSoundInstance;
        private _coinCount = 3;

        private _bulletManager: managers.Bullet;

        //public props

        //constructor
        constructor() {
            super();

            this.Start();
        }

        //private methods

        //public methods
        public Reset(): void {
        }

        public Destroy(): void {
            this.removeAllChildren();
            this._engineSound.stop();
            //TODO: Clean up bullet mananger
        }

        public Start(): void {
            //Ocean background
            this._ocean = new objects.Ocean();

            //Player object
            this._player = new objects.Player();

            //Coin array
            this._coins = [];

            //Enemy object
            this._enemy = new objects.Enemy();

            this._engineSound = createjs.Sound.play("engineSound", { volume: 0.067, loop: -1 });

            //Instantiate new bullet manager
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManager = this._bulletManager;

            this.Main();
        }

        public Update(): void {
            this._ocean.Update();
            this._player.Update();
            if(this._coins.length < this._coinCount)
            {
                if(createjs.Ticker.getTicks() % 60 === 0)
                {
                    this._coins.push(new objects.Coin());
                    this.addChild(this._coins[this._coins.length- 1]);
                }
            }
            this._coins.forEach(coin => {
                coin.Update();
                this._player.checkIntersectionNotCentered(coin);
            });
            this._enemy.Update();
            this._player.checkIntersection(this._enemy);

            this._bulletManager.Update();
            this._bulletManager.Bullets.forEach(bullet => {
                if (bullet.IsInPlay) {
                    this._player.checkIntersection(bullet);
                    this._enemy.checkIntersection(bullet);
                }
            });
        }

        public Main(): void {
            this.addChild(this._ocean);
            this.addChild(this._enemy);
            this.addChild(this._player);
            //Add each bullet in the array to the scene
            this._bulletManager.Bullets.forEach(bullet => {
                this.addChild(bullet);
            });

            managers.Game.scoreBoard.AddGameUI(this);
        }
    }
}