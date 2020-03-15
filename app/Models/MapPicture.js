'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MapPicture extends Model {
    static get table() {
        return "maps_pictures"
    }
}

module.exports = MapPicture
