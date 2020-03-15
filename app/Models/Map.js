'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Map extends Model {
    heroes () {
        return this.manyThrough('App/Models/MapHero', "hero")
    }

    pictures () {
        return this.hasMany('App/Models/MapPicture')
    }
}

module.exports = Map
