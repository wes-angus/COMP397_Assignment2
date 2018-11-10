module managers {
    export class Game {
        //Globals
        public static assetManager: createjs.LoadQueue;
        public static stage: createjs.Stage;
        public static curState: config.Scene;
        public static scoreBoard: managers.ScoreBoard;
        public static bulletManager: managers.Bullet;
    }
}