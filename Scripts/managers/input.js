var managers;
(function (managers) {
    var Input = /** @class */ (function () {
        function Input() {
        }
        Input.isKeydown = function (key) {
            return Input.keys[key];
        };
        Input.ShowInput = function (e, not) {
            if (not) {
                console.log(e.key + " Not");
            }
            else {
                console.log(e.key);
            }
        };
        Input.HandleInput = function (e) {
            //this.ShowInput(e);
            Input.keys[e.code] = true;
        };
        Input.HandleUpInput = function (e) {
            //this.ShowInput(e, true);
            Input.keys[e.code] = false;
        };
        Input.keys = {};
        return Input;
    }());
    managers.Input = Input;
})(managers || (managers = {}));
//# sourceMappingURL=input.js.map