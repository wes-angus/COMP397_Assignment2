module config {
    export enum ActionEnum {
        Up,
        Down,
        Right,
        Left,
        Shoot
    }

    export const INPUT_KEY:string[][] = [
        [ // Player 1
            "KeyW",         // Forward
            "KeyS",         // Backward
            "KeyD",         // Right
            "KeyA",         // Left
            "KeyE"          // shoot
        ],
        [ // Player 2
            "ArrowUp",      // Forward
            "ArrowDown",    // Backward
            "ArrowRight",   // Right
            "ArrowLeft",    // Left
            "ShiftRight"    // shoot
        ]
    ]
}