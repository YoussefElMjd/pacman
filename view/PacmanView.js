/**
 * For the view of Pacman
 */
class PacmanView {
    /**
     * Has only the Pacman controller as a parameter. 
     * Add the necessary event management to control the Pacman.
     * to control the Pacman, use the arrow keys.
     * @param {PacmanCtrl} pacmanCtrl the control of pacman.
     */
    constructor(pacmanCtrl) {
        this._pacmanCtrl = pacmanCtrl;
        $(document).on("keydown", function (event) {
            switch (event.key) {
                case "ArrowUp":
                    pacmanCtrl.askToChangeDirection(Direction.NORTH)
                    break;
                case "ArrowDown":
                    pacmanCtrl.askToChangeDirection(Direction.SOUTH)
                    break;
                case "ArrowLeft":
                    pacmanCtrl.askToChangeDirection(Direction.WEST)
                    break;
                case "ArrowRight":
                    pacmanCtrl.askToChangeDirection(Direction.EAST)
                    break;
            }
        });
    }
}