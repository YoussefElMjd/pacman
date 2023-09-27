class PacmanCtrl {
    /**
     * Has only one parameter, the Pacman object
     * @param {Pacman} pacman 
     */
    constructor(pacman) {
        this._pacman = pacman;
    }
    
    /**
     * It does nothing more than call the Pacman object's namesake method.
     * Means that at the next opportunity, the sprite must change direction.
     * @param {Direction} direction the Direction
     */
    askToChangeDirection(direction) {
        this._pacman.askToChangeDirection(direction);
    }
}