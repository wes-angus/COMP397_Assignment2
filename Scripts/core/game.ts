//IIFE - Immediately Invoked Function Expression
(function () {
    //function-scoped (game) variables
    let canvas: HTMLCanvasElement;
    let stage: createjs.Stage;
    let assetManager: createjs.LoadQueue;

    let curScene: objects.Scene;
    let curState: config.Scene;

    let scoreBoard: managers.ScoreBoard;

    let assetManifest = [
        { id: "startButton", src: "./Assets/images/startButton.png" },
        { id: "restartButton", src: "./Assets/images/restartButton.png" },
        { id: "menuButton", src: "./Assets/images/menuButton.png" },
        { id: "exitButton", src: "./Assets/images/exitButton.png" },
        { id: "howToButton", src: "./Assets/images/howToButton.png" },
        { id: "nextButton", src: "./Assets/images/nextButton.png" },
        { id: "tank", src: "./Assets/images/tank.png" },
        { id: "enemy", src: "./Assets/images/tank2.png" },
        { id: "coin", src: "./Assets/images/coin10.png" },
        { id: "space", src: "./Assets/images/tileable-space-background-small.png" },
        { id: "levelMusic", src: "./Assets/audio/Dexter_Britain_-_11_-_Wonderland_Instrumental.mp3" },
        { id: "bullet", src: "./Assets/images/bullet1.png" },
        { id: "bulletSound", src: "./Assets/audio/bullet.mp3" },
        { id: "explodeSound", src: "./Assets/audio/explosion.mp3" },
        { id: "coinSound", src: "./Assets/audio/coin.wav" },
        { id: "lifeSound", src: "./Assets/audio/life.wav" }
    ];

    function Init(): void {
        assetManager = new createjs.LoadQueue();
        managers.Game.assetManager = assetManager; //global reference to assetManager
        assetManager.installPlugin(createjs.Sound); //enable sound preloading
        assetManager.loadManifest(assetManifest); //preloads assets listed in the manifest
        assetManager.on("complete", Start); //call Start when assets are finished loading
    }

    function Start(): void {
        console.log(`%c Game Started...`, "color: blue; font-size: 20px;");
        canvas = document.getElementsByTagName("canvas")[0];
        stage = new createjs.Stage(canvas);
        managers.Game.stage = stage; //global ref. to stage
        stage.enableMouseOver(20);
        createjs.Ticker.framerate = 60;
        createjs.Ticker.on("tick", Update);
        document.addEventListener("keydown", (event) => {
            managers.Input.HandleInput(event);
        });
        document.addEventListener("keyup", (event) => {
            managers.Input.HandleUpInput(event);
        });

        //Setup global scoreboard and UI
        scoreBoard = new managers.ScoreBoard();
        managers.Game.scoreBoard = scoreBoard;

        //Setup initial scene
        curState = config.Scene.START;
        managers.Game.curState = curState;
        Main();
    }

    //main game loop
    function Update(): void {
        curScene.Update();

        if (curState != managers.Game.curState) {
            curState = managers.Game.curState;
            Main();
        }

        stage.update();
    }

    function Main(): void {
        if (curScene) {
            curScene.Destroy();
            stage.removeAllChildren();
        }
        switch (curState) {
            case config.Scene.START:
                curScene = new scenes.Start();
                break;
            case config.Scene.LEVEL1:
                curScene = new scenes.Level1();
                break;
            case config.Scene.INSTRUCTIONS:
                curScene = new scenes.Instructions();
                break;
            case config.Scene.OVER:
                curScene = new scenes.Over();
                break;
        }

        stage.addChild(curScene);
    }

    window.addEventListener("load", Init);
})();