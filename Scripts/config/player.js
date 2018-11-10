var config;
(function (config) {
    var ActionEnum;
    (function (ActionEnum) {
        ActionEnum[ActionEnum["Forward"] = 0] = "Forward";
        ActionEnum[ActionEnum["Backward"] = 1] = "Backward";
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
            "KeyAlt" // shoot
        ]
    ];
})(config || (config = {}));
//# sourceMappingURL=player.js.map