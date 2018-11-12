//Manager class with static functions for working with cookies
module managers {
    export class Cookie {
        //Initialize/update cookie on the page
        public static setCookie(property: string, value: any) {
            let d: Date = new Date();
            d.setTime(d.getTime() + (10 * 365 * 24 * 60 * 60 * 1000));
            let expires: string = "expires=" + d.toUTCString();
            document.cookie = property + "=" + value + ";" + expires + ";path=/";
            console.log("Saved cookie: ", document.cookie);
        }

        //public methods
        //Retrieve cookie from the browser and get the specified property
        public static getCookie(property: string): string {
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
        }
    }
}