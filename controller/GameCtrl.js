/**
 * Allow to start the game
 */
class GameCtrl {
    /**
     * Its role is to automate the creation of the game and the associated visual.
     */
    constructor() {
        this._game = new Game(RAW_MAZE);
        this._view = new GameView(this._game, this);
        this._pacmanCtrl = new PacmanCtrl(this._game.pacman);
        this._pacmanView = new PacmanView(this._pacmanCtrl);

    }

    /**
     * Allow to check if pacman has been eaten or not.  
     * If the pacman has been eat we remove a life at the pacman.
     * If pacman don't have lives the game is finish.
     */
    checkPacmanHasBeenEaten() {
        if (this._game.pacmanHasBeenEaten()) {
            this._game.respawn();
            this._view.updateLives();
            if (this._game._pacman.nbLives == 0) {
                console.log("GAME OVER");
                this._game.saveScore();
                this._view.displayGameOver();
                clearInterval(this.timer);
            }
        }
    }

    /**
     * interval for refresh the frame game.
     */
    run() {
        this.timer = setInterval(() => {
            this._game.moveSprites();
            this._view.updateFram();
            this.checkPacmanHasBeenEaten();
            this.lvlSuccedPassed();
        }, RUN_INTERVAL);
    }

    /**
     * Allow to next level if the actual level has been passed. 
     */
    lvlSuccedPassed() {
        if (this._game.lvlSucced()) {
            this._game.nextLevel();
            this._view.nextLevel();
        }
    }

}
/**
 * Start the game.
 */
function main() {
    gameCtrl = new GameCtrl();
    $("#start").click(function () {
        startGame();
    });
}

/**
 * Allow to run the interval for refresh the frame game.
 * @returns {function}
 */
function startHasBeenRequested() {
    gameCtrl.run();
}


