/**
 * A sprite is a moving element in the game. For example, Pacman or ghosts.
 */
class Sprite extends Component {
    /**
     * Allow to create a Sprite.
     * @param {Position} position The position
     * @param {Direction} direction The direction
     * @param {string} id The id
     */
    constructor(position, direction, id) {
        super(id);
        this._position = position;
        this.firstPosition = position;
        this._direction = direction;
        this.firstDirection = direction;
        this.askedDirection;
        this.askedToChangeDirection = false;
        this.previousPosition = position;
        this._isDead = false;
    }
    /**
     * @returns {Position}
     */
    get position() {
        return this._position;
    }

    /**
     * @returns {Direction}
     */
    get direction() {
        return this._direction;
    }

    /**
     * @returns {Boolean}
     */
    get askedToChangeDirections() {
        return this.askedToChangeDirection;
    }

    /**
     * @returns {Boolean}
     */
    get isDead() {
        return this._isDead;
    }

    /**
     * Allows the sprite to move in its direction and save the position before the move.
     */
    move() {
        this.previousPosition = this._position;
        this._position = this._position.nextPosition(this._direction);
    }

    /**
     * Means that at the next opportunity, the sprite must change direction.
     * @param {Direction} direction the direction.
     */
    askToChangeDirection(direction) {
        this.askedToChangeDirection = true;
        this.askedDirection = direction;
    }

    /**
     * Makes the change of direction of the sprite effective.
     */
    changeDirection() {
        this.askedToChangeDirection = false;
        this._direction = this.askedDirection;
    }

    /**
     * An intention to change direction is signified when the ghost is blocked.
     */
    notifyIsBlocked() {
    }

    /**
     * Allow to know if the sprite has been dead or not.
     */
    hasBeenEater() {
        this._isDead = true;
    }

    /**
     * Allows you to redefine some attributes to the original one.
     */
    respawn() {
        this._isDead = false;
        this._position = this.firstPosition;
        this._direction = this.firstDirection;
    }
}