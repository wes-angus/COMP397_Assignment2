module util {
    export class Vector2 extends createjs.Point {
        //private inst. vars

        //public props

        //constructor
        constructor(x: number = 0, y: number = 0) {
            super(x, y);
        }

        //public methods
        /**
         *This method returns the Euclidian distance between 2 vectors
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {util.Vector2} vec2
         * @returns {number}
         * @memberof Vector2
         */
        public static Dist(vec1: util.Vector2, vec2: util.Vector2): number {
            return Math.floor(Math.sqrt(Math.pow(vec2.x - vec1.x, 2) + Math.pow(vec2.y - vec1.y, 2)));
        }

        /**
         * Adds 2 vectors
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {util.Vector2} vec2
         * @returns {util.Vector2}
         * @memberof Vector2
         */
        public static Add(vec1: util.Vector2, vec2: util.Vector2): util.Vector2 {
            let result: util.Vector2 = new util.Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
            return result;
        }

        /**
         * Subtracts a 2nd vector from an initial vector
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {util.Vector2} vec2
         * @returns {util.Vector2}
         * @memberof Vector2
         */
        public static Sub(vec1: util.Vector2, vec2: util.Vector2): util.Vector2 {
            let result: util.Vector2 = new util.Vector2(vec1.x - vec2.x, vec1.y - vec2.y);
            return result;
        }

        /**
         * Multiplies a vector by a number
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {number} factor
         * @returns {util.Vector2}
         * @memberof Vector2
         */
        public static Mult(vec1: util.Vector2, factor: number): util.Vector2 {
            return new util.Vector2(vec1.x * factor, vec1.y * factor);
        }

        /**
         * Divides a vector by a number
         *
         * @static
         * @param {util.Vector2} vec1
         * @param {number} factor
         * @returns {util.Vector2}
         * @memberof Vector2
         */
        public static Div(vec1: util.Vector2, factor: number): util.Vector2 {
            return new util.Vector2(vec1.x / factor, vec1.y / factor);
        }


        // Convenience Methods

        public static up(): util.Vector2 {
            return new Vector2(0, -1);
        }

        public static down(): util.Vector2 {
            return new Vector2(0, 1);
        }

        public static right(): util.Vector2 {
            return new Vector2(1, 0);
        }

        public static left(): util.Vector2 {
            return new Vector2(-1, 0);
        }

        public static zero(): util.Vector2 {
            return new Vector2();
        }

        //private methods
    }
}