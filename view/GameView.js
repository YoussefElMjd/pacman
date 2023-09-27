/**
 * GameView will centralise the display of each component of our game: tiles, Pacman and ghosts.
 */
class GameView {
    /**
     * When the object is created, the labyrinth is displayed (walls and dot).
     * @param {Array} game tha labyrinth of the game.
     */
    constructor(game, gameCtrl) {
        this._gameCtrl = gameCtrl;
        this._game = game;
        this.displayGame();
        this.addPacman();
        this.addLives();
        this.displayGameOver();
    }

    /**
     * function that displays the elements of the game board.
     * @param {Array} Layer the Array of the layer.
     */
    displayGame() {
        $("main").css({ "height": `${this._game.maze.nbRows * TILE_SIZE}`, "width": `${this._game.maze.nbColumns * TILE_SIZE}` })
        for (let i = 0; i < this._game.maze.nbRows; i++) {
            for (let j = 0; j < this._game.maze.nbColumns; j++) {
                let position = new Position(i, j);
                if (this._game.maze._wallLayer.hasTile(position)) {
                    $(`#board`).append(`<div class="wall" ${this.addStyleDiv(i, j)}></div>`)
                }
                if (this._game.maze._dotLayer.hasTile(position)) {
                    let getDotTile = this._game.maze.getDotLayerTile(position).isEnergizer;
                    if (getDotTile) {
                        $(`#board`).append(`<div class="energizer" id="${String(j) + "-" + String(i)}" ${this.addStyleDiv(i, j)}></div>`)
                    } else {
                        $(`#board`).append(`<div class="pac-dot" id="${String(j) + "-" + String(i)}" ${this.addStyleDiv(i, j)}></div>`)
                    }
                }
            }
        }
        $("#board").append(`<input type="submit" id="start" value="START">`)
        this.addGhost();
    }

    /**
     * Allow to add the style of div.
     * @param {Integer} i the indice i.
     * @param {Integer} j the indice j.
     * @returns the stlye you want to add.
     */
    addStyleDiv(i, j) {
        return `style = "top:${TILE_SIZE * i}px; left:${TILE_SIZE * j}px";`
    }

    /**
     * Allow to refreshes the game. 
     */
    updateFram() {
        this.updateGhost();
        this.updateDot();
        this.updateScore();
    }

    /**
     * Allows to update the lives of pacman.
     */
    updateLives() {
        $('#live').find('div').first().remove();
    }

    /**
     * Allows to add start lives of pacman.
     */
    addLives() {
        for (let i = 0; i < LIFE_PACMAN; i++) {
            $(`#live`).append(`<div class="life"></div>`)
        }
    }

    /**
     * Allow to add the pacman in the game.
     */
    addPacman() {
        let getPacman = this._game.maze.pacManPos;
        $(`#board`).append(`<div class="pacman" ${this.addStyleDiv(getPacman.row, getPacman.column)}></div>`)
    }

    /**
     * Allow to add all of ghost in the game.
     */
    addGhost() {
        let ghost = this._game;
        $(`#board`).append(`<div class="blinky" ${this.addStyleDiv(ghost._blinky._position.row, ghost._blinky._position.column)}></div>`)
        $(`#board`).append(`<div class="pinky" ${this.addStyleDiv(ghost._pinky._position.row, ghost._pinky._position.column)}></div>`)
        $(`#board`).append(`<div class="inky" ${this.addStyleDiv(ghost._inky._position.row, ghost._inky._position.column)}></div>`)
        $(`#board`).append(`<div class="clyde" ${this.addStyleDiv(ghost._clyde._position.row, ghost._clyde._position.column)}></div>`)
    }

    /**
     * Allow to update the image of the movement of the ghost.
     */
    updateGhost() {
        let position = this._game.pacman.position;
        let ghost = this._game;
        $(".pacman").css({ "top": `${TILE_SIZE * position.row}px`, "left": `${TILE_SIZE * position.column}px` })
        $(`.blinky`).css({ "top": `${TILE_SIZE * ghost._blinky._position.row}px`, "left": `${TILE_SIZE * ghost._blinky._position.column}px` })
        $(`.pinky`).css({ "top": `${TILE_SIZE * ghost._pinky._position.row}px`, "left": `${TILE_SIZE * ghost._pinky._position.column}px` })
        $(`.inky`).css({ "top": `${TILE_SIZE * ghost._inky._position.row}px`, "left": `${TILE_SIZE * ghost._inky._position.column}px` })
        $(`.clyde`).css({ "top": `${TILE_SIZE * ghost._clyde._position.row}px`, "left": `${TILE_SIZE * ghost._clyde._position.column}px` })
    }

    /**
     * Allows to update the score of the game.
     */
    updateScore() {
        $(`#score`).text(this._game.score);
    }

    /**
     * Allows to remove a dot eat by the pacman.
     */
    updateDot() {
        let id = this._game.removedDot._id
        $(`#${id}`).remove();
    }

    /**
     * Allow to change the highscore.
     */
    displayGameOver() {
        $("#highScore").text(this._game.highscore);
    }

    /**
     * Allow to display the next level (restart the game).
     */
    nextLevel() {
        $("#board").remove();
        $("main").append("<div id=board>")
        this._game.nextLevel();
        this.displayGame();
        this.addPacman();
        $("#start").hide();

    }

}

/**
 * Allow to start the Game.
 */
function startGame() {
    $("#start").hide();
    startHasBeenRequested();
}