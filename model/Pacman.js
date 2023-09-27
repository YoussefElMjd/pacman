/**
 * The powerful, the pleasurable, the indestructible Pacman.
 */
class Pacman extends Sprite {
    /**
     ∗ @param { Position } position the initial position
     ∗ @param { Direction } direction the initial direction
     */
    constructor(position, direction) {
        super(position, direction, PACMAN_ID);
        this._nbLives = LIFE_PACMAN;
    }

    /**
     * @returns {number}
     */
    get nbLives() {
        return this._nbLives;
    }
    /**
     * Allow to remove a live at the pacman beacause he is dead.
     * @returns {Boolean} true if pacman has been eaten.
     */
    hasBeenEaten() {
        this._nbLives--;
        return this.hasBeenEater();
    }
}