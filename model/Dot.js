/**
 * The class represents the dot of the board.
 */
class Dot extends Tile {
    /**
     * Allows creat a dot and to know if it is a "super dot".
     * 
     * @param {Boolean} isEnergizer has Energizer.
     */
    constructor(isEnergizer, id) {
        super(id);
        this._isEnergizer = isEnergizer;
    }

    /**
     * @returns {Boolean}
     */
    get isEnergizer() {
        return this._isEnergizer;
    }
}