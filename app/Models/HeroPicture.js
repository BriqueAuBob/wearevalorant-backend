'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HeroPicture extends Model {
    static get table() {
        return "heroes_pictures"
    }
}

module.exports = HeroPicture
