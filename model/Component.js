/**
 * Is a fixed Pacman maze component like a wall or a dot.
 */
class Component {
    /**
       * To be created, a component just need an id.
       *
       * @param {string} id unique component's id
       */
    constructor(id) {
        this._id = id;
    }

    /**
     * @returns {string}
     */
    get id() { return this._id; }
}