/**
 * Creation of the ghosts they have a behaviour very close to the pacman.
 */
class Ghost extends Sprite {
    constructor(position, direction) {
        super(position, direction);
        setInterval(() => {
            this._choiceNewDirection();
            this.notifyIsBlocked();
        }, GHOST_INTERVAL);
    }
    /**
     * Method that will allow the ghost to signal its intention to change direction. 
     */
    _choiceNewDirection() {
        let directions = [Direction.NORTH, Direction.SOUTH, Direction.WEST, Direction.EAST];
        let indice = Math.floor(Math.random() * directions.length);
        this.askToChangeDirection(directions[indice]);
    }
    /**
     * Check if the Pacman and the ghost are in the same position or 
     * if the Pacman is in the ghost's old position and the ghost is in the Pacman's old position.
     * the ghost is at the old position of the Pacman.
     * @param {Pacman} pacman the pacman
     * @returns true if the Pacman and the ghost are at the same position or 
     * if the Pacman is at the ghost's old position and the ghost is at the Pacman's old position false otherwhise.
     */
    canEat(pacman) {
        return JSON.stringify(this.position) == JSON.stringify(pacman.position)
            || (JSON.stringify(this.previousPosition) == JSON.stringify(pacman.position)
                && JSON.stringify(this.position) == JSON.stringify(pacman.previousPosition));
    }

    /**
     * An intention to change direction is signified when the ghost is blocked.
     */
    notifyIsBlocked() {
        this.changeDirection();
    }
}