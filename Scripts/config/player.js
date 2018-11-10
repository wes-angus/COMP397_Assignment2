var config;
(function (config) {
    var ActionEnum;
    (function (ActionEnum) {
        ActionEnum[ActionEnum["Up"] = 0] = "Up";
        ActionEnum[ActionEnum["Down"] = 1] = "Down";
        ActionEnum[ActionEnum["Right"] = 2] = "Right";
        ActionEnum[ActionEnum["Left"] = 3] = "Left";
        ActionEnum[ActionEnum["Shoot"] = 4] = "Shoot";
    })(ActionEnum = config.ActionEnum || (config.ActionEnum = {}));
    config.INPUT_KEY = [
        [
            "KeyW",
            "KeyS",
            "KeyD",
            "KeyA",
            "KeyE" // shoot
        ],
        [
            "ArrowUp",
            "ArrowDown",
            "ArrowRight",
            "ArrowLeft",
            "ShiftRight" // shoot
        ]
    ];
})(config || (config = {}));
//# sourceMappingURL=player.js.map