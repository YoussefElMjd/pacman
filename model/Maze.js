/**
 * The class is used to model the Game labyrinth. For its good functioning, two layers (Layer) will be used.
 */
class Maze {
    /**
     * Allows to build the layer linked to the wall tiles and the layer linked to the gum tiles.
     * @param {Array} RAW_MAZE the arrays of labyrinth
     */
    constructor(RAW_MAZE) {
        this._wallLayer = new Layer(RAW_MAZE.table.length, RAW_MAZE.table[0].length);
        this._dotLayer = new Layer(RAW_MAZE.table.length, RAW_MAZE.table[0].length);
        this._nbDots = 0;
        let tab = RAW_MAZE.table
        for (let i = 0; i < tab.length; i++) {
            let lengthOfLine = tab[i].length;
            for (let j = 0; j < lengthOfLine; j++) {
                switch (tab[i][j]) {
                    case 1:
                        this._wallLayer.setTile(new Position(i, j), new Wall(tab[i][j]));
                        break;
                    case 2:
                        this._nbDots++;
                        this._dotLayer.setTile(new Position(i, j), new Dot(false, String(j) + "-" + String(i)));
                        break;
                    case 3:
                        this._nbDots++;
                        this._dotLayer.setTile(new Position(i, j), new Dot(true, String(j) + "-" + String(i)));
                        break;
                    case 4:
                        this._pacManPos = new Position(i, j);
                        break;
                    case 5:
                        this._ghostPos = new Position(i, j);
                        break;
                }
            }
        }
    }

    /**
     * Allows to get the wall tile at the given position.
     * @param {Position} pos The position.
     * @returns The tile of the wal.
     */
    getWallLayerTile(pos) {
        if (!this._wallLayer.contains(pos)) {
            throw "la position n'est pas compris dans le tableau"
        }
        return this._wallLayer.getTile(pos)._id;
    }

    /**
     * Allows to obtain the tile of the dot at the given position.
     * @param {Position} pos The position.
     * @returns The tile of the dot.
     */
    getDotLayerTile(pos) {
        if (!this._dotLayer.contains(pos)) {
            throw "la position n'est pas compris dans le tableau"
        }
        return this._dotLayer.getTile(pos);
    }

    /**
     * Allow to know if f the position is part of the maze and if there is no collision with a wall at the given position.
     * @param {Position} position the position.
     * @returns {Boolean} returns true if the position is part of the maze and 
     * if there is no collision with a wall at the given position, false otherwise.
     */
    canWalkOn(position) {
        return this._wallLayer.contains(position)
            && !this._wallLayer.hasTile(position);
    }

    /**
     * Allows to know if the position is part of the maze and if there is an dot to take.
     * @param {Position} position the position.
     * @returns {Boolean} returns true if the position is part of the maze and if there is an dot to take and false otherwise.
     */
    canPick(position) {
        return this._dotLayer.contains(position)
            && this._dotLayer.hasTile(position)
    }

    /**
     * Allow to pick the dot in a position.
     * @param {Position} position the position.
     * @returns {Dot} the dot who has been eat by pacman.
     */
    pick(position) {
        if (!this._dotLayer.hasTile(position)) {
            throw "Il n y a rien a manger pour PacMan ici"
        }
        if (this.canPick(position)) {
            let dot = this._dotLayer.getTile(position);
            this._dotLayer.setTile(position, undefined);
            this._nbDots--;
            return dot;
        }
    }

    /**
     * Allow to know if pacman eat all of dot.
     * @returns {Boolean} true if pacman eat all dot and false otherwhise.
     */
    isEmpty() {
        return this._nbDots == 0;
    }

    /**
     * @returns {Integer}
     */
    get nbRows() {
        return RAW_MAZE.table.length;
    }

    /**
    * @returns {Integer}
    */
    get nbColumns() {
        return RAW_MAZE.table[0].length;
    }

    /**
     * @returns {Position}
     */
    get pacManPos() {
        return this._pacManPos;
    }

    /**
     * @returns {Position}
     */
    get ghostPos() {
        return this._ghostPos;
    }
}
