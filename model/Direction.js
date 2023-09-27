/**
 * The direction class will allow us to describe the directions that our sprites can take.
 */
class Direction {
    constructor(deltaRow, deltaColumn) {
        this._deltaRow = deltaRow;
        this._deltaColumn = deltaColumn;
    }
    /**
     * @returns {Number}
     */
    get deltaRow() {
        return this._deltaRow;
    }
    /**
     * @returns {Number}
     */
    get deltaColumn() {
        return this._deltaColumn;
    }
}
Direction.NORTH = new Direction(-1, 0);
Direction.SOUTH = new Direction(1, 0);
Direction.WEST = new Direction(0, -1);
Direction.EAST = new Direction(0, 1);