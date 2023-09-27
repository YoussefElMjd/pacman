/**
 * A position and a set of a row and a column, this will give a position in the board.
 */
class Position {
    /**
     * Creates a new position with a row and a column as parameters.
     * @param {Integer} row the row
     * @param {Integer} column the column
     */
    constructor(row, column) {
        this._row = row;
        this._column = column;
    }

    /**
     * Allows you to change the current position according to a given direction.
     * @param {Direction} dir the direction.
     * @returns {Position} return the next position in the given direction.
     */
    nextPosition(dir) {
        return new Position(this._row + dir.deltaRow, this._column + dir.deltaColumn)
    }

    /**
     * @returns {Integer}
     */
    get row() {
        return this._row;
    }
    /**
     * @returns {Integer}
     */
    get column() {
        return this._column;
    }
}