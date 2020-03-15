'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MapHero extends Model {
    static get table() {
        return "maps_heroes"
    }

    hero() {
        return this.hasOne("App/Models/Hero", "id", "id")
    }

    map() {
        return this.hasOne("App/Models/Map", "id", "id")  
    }
}

module.exports = MapHero
