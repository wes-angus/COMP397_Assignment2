//Music: Wonderland (Instrumental) by Dexter Britain
//Source: https://dexterbritain.com/

//Main level scene class
module scenes {
    export class Level1 extends objects.Scene {
        //private inst. vars
        //Game objects
        private _player: objects.Player;
        private _space: objects.Background;
        private _coins: objects.Coin[];
        private _enemies: objects.Enemy[];
        private _music: createjs.AbstractSoundInstance;
        private _coinCount = 4;
        private _startingEnemies: number = 20;
        private _enemyCount = 4;

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
            this._music.stop();
        }

        public Start(): void {
            //Ocean background
            this._space = new objects.Background();

            //Player object
            this._player = new objects.Player();

            //Coin array
            this._coins = [];

            //Enemy object
            this._enemies = [];

            this._music = createjs.Sound.play("levelMusic", { volume: 0.2, loop: -1 });

            //Instantiate new bullet manager
            this._bulletManager = new managers.Bullet();
            managers.Game.bulletManager = this._bulletManager;

            this.Main();
        }

        public Update(): void {
            //Update all game objects in the level and check collisions between certain ones
            this._space.Update();
            this._player.Update();
            if (this._coins.length < this._coinCount) {
                if (createjs.Ticker.getTicks() % 60 === 0) {
                    this._coins.push(new objects.Coin());
                    this.addChild(this._coins[this._coins.length - 1]);
                }
            }
            this._coins.forEach(coin => {
                coin.Update();
                this._player.checkIntersectionNotCentered(coin);
            });
            if (this._enemies.length < this._enemyCount) {
                if (createjs.Ticker.getTicks() % 120 === 0) {
                    this._enemies.push(new objects.Enemy());
                    this.addChild(this._enemies[this._enemies.length - 1]);
                }
            }
            this._enemies.forEach(enemy => {
                enemy.Update();
                this._player.checkIntersectionNotCentered(enemy);
            });

            this._bulletManager.Update();
            this._bulletManager.Bullets.forEach(bullet => {
                if (bullet.IsInPlay) {
                    if (bullet.Owner === "enemy") {
                        this._player.checkIntersection(bullet);
                    }
                    else if (bullet.Owner === "player") {
                        this._enemies.forEach(enemy => {
                            if (enemy.Health > 0) {
                                enemy.checkIntersectionNotCentered(bullet);
                            }
                        });
                    }
                }
            });
        }

        public Main(): void {
            this.addChild(this._space);
            //Set up number of enemies to kill in this level
            managers.Game.scoreBoard.RemainingEnemies = this._startingEnemies;
            managers.Game.scoreBoard.AddGameUI(this);
            this.addChild(this._player);            
            //Add each bullet in the array to the scene
            this._bulletManager.Bullets.forEach(bullet => {
                this.addChild(bullet);
            });
        }
    }
}