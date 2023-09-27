/**
 * The layers each group a set of tiles to form a layer.
 */
class Layer {
    /**
     * To be create a layer, just need a number of rows and number of columns.
     * @param {Integer} nbRows the number of rows.
     * @param {Integer} nbColumns the number of columns.
     */
    constructor(nbRows, nbColumns) {
        this._layer = Array(nbRows).fill().map(() => Array(nbColumns));
    }

    /**
     * Checks if the position belongs to the layer tray (row/column between 0 and no. of rows/columns -1).
     * @param {Position} pos The position.
     * @returns true if the position belongs to the layer tray false otherwise. 
     */
    contains(pos) {
        let row = pos.row;
        let col = pos.column;
        return (row >= 0 && col >= 0 && row <= this._layer.length - 1 && col <= this._layer[0].length - 1)
    }

    /**
     * Allows you to place a tile at a given position in the layer.
     * @param {Position} pos The position.
     * @param {Tile} tile The tile.
     */
    setTile(pos, tile) {
        if (!this.contains(pos)) {
            throw "la position n'est pas compris dans le tableau"
        }
        this._layer[pos.row][pos.column] = tile;
    }

    /**
     * Allows to obtain the tile present on the layer at the given position.
     * @param {Position} pos The position.
     * @returns the tile.
     */
    getTile(pos) {
        if (!this.contains(pos)) {
            throw "la position n'est pas compris dans le tableau"
        }
        return this._layer[pos.row][pos.column];
    }

    /**
     * Check that the given position contains a tile and not a void.
     * @param {Position} pos The position.
     * @returns true if it contains a tile false otherwise.
     */
    hasTile(pos) {
        if (!this.contains(pos)) {
            throw "la position n'est pas compris dans le tableau"
        }
        return this._layer[pos.row][pos.column] != null;
    }
}