var managers;
(function (managers) {
    var Cookie = /** @class */ (function () {
        function Cookie() {
        }
        Cookie.setCookie = function (property, value) {
            var d = new Date();
            d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            document.cookie = property + "=" + value + ";" + expires + ";path=/";
            console.log("Saved cookie: ", document.cookie);
        };
        //public methods
        Cookie.getCookie = function (property) {
            var name = property + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        };
        return Cookie;
    }());
    managers.Cookie = Cookie;
})(managers || (managers = {}));
//# sourceMappingURL=cookie.js.map