/**
 * The Game class will serve as a front.
 */
class Game {
    /**
     * Game has a rawMaze argument which allows the initialization of the game maze, the pacman and the ghosts.
     * @param {Array} RAW_MAZE the arrays of labyrinth
     */
    constructor(RAW_MAZE) {
        this._maze = new Maze(RAW_MAZE);
        this._pacman = new Pacman(this._maze.pacManPos, Direction.WEST)
        this._blinky = new Ghost(this._maze._ghostPos, Direction.NORTH);
        this._pinky = new Ghost(this._maze._ghostPos, Direction.WEST);
        this._inky = new Ghost(this._maze._ghostPos, Direction.EAST);
        this._clyde = new Ghost(this._maze._ghostPos, Direction.SOUTH);
        this._ghost = [this._blinky, this._pinky, this._inky, this._clyde];
        this._score = 0;
        this._removedDot = null;
        this._highScore = null;
        this._highScore = localStorage.getItem("score");
        if (!this._highScore) {
            this._highScore = 0;
        }
    }

    /**
     * @returns {Array}
     */
    get maze() {
        return this._maze;
    }

    /**
     * @returns {Pacman}
     */
    get pacman() {
        return this._pacman;
    }

    /**
     * @returns {Number}
     */
    get score() {
        return this._score;
    }

    /**
     * @returns {Dot}
     */
    get removedDot() {
        return this._removedDot;
    }

    /**
     * @returns {Number}
     */
    get highscore() {
        return this._highScore;
    }

    /**
     * This method will move the Pacman and the ghost
     * Special case: If a change of direction has been requested and 
     * it is possible to move in the desired direction, 
     * then this change of direction must be made effective before moving the Pacman.
     */
    moveSprites() {

        for (let element of this._ghost) {
            if (element.askedToChangeDirections && this._maze.canWalkOn(element.position.nextPosition(element.askedDirection))) {
                element.notifyIsBlocked();
                element.move();
            } else if (!this._maze.canWalkOn(element.position.nextPosition(element._direction))) {
                element._choiceNewDirection();
            } else if (this._maze.canWalkOn(element.position.nextPosition(element._direction))) {
                element.move();
            }
            if (element.canEat(this._pacman)) {
                this._pacman.hasBeenEaten();
            }
        }

        if (this._pacman.askedToChangeDirections && this._maze.canWalkOn(this._pacman.position.nextPosition(this._pacman.askedDirection))) {
            this._pacman.changeDirection()
            this._pacman.move();
        } else if (this._maze.canWalkOn(this._pacman.position.nextPosition(this._pacman._direction))) {
            this._pacman.move();
        }

        if (this._maze._dotLayer.hasTile(this._pacman.position)) {
            if (this._maze.canPick(this._pacman.position)) {
                this._removedDot = this._maze.pick(this._pacman.position);
                let isEnergizer = this._removedDot.isEnergizer;
                if (!isEnergizer) {
                    this._score += 10;
                } else if (isEnergizer) {
                    this._score += 100;
                }
            }
        }
    }

    /**
     * Allow to know if the game is over or not.
     * @returns {Boolean} true if the game is over
     */
    isGameOver() {
        return this._pacman.nbLives == 0;
    }

    /**
     * Allow to know if the pacman has been eat by a ghost.
     * @returns {Boolean} true if the pacman has been eat by a ghost.
     */
    pacmanHasBeenEaten() {
        return this._pacman.isDead;
    }

    /**
     * Allow to respawn all ghost and pacman of the game.
     */
    respawn() {
        this._pacman.respawn();
        for (let e of this._ghost) {
            e.respawn();
        }
    }

    /**
     * Allows to save the best score.
     */
    saveScore() {
        if (this._score > this._highScore) {
            localStorage.setItem("score", JSON.stringify(this._score));
            this._highScore = this._score;
        }
    }

    /**
     * Allow to check if pacman eat all dot.
     * @returns {Boolean} true if all dot has been eaten by pacman.
     */
    lvlSucced() {
        return this._maze.isEmpty();
    }

    /**
     * Allow to go to the next level, create a new labyrinth and repawn the pacman and the ghosts.
     */
    nextLevel() {
        this._maze = new Maze(RAW_MAZE);
        this.respawn();
    }
}