'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hero extends Model {
    static get table () {
        return 'heroes'
    }

    pictures () {
        return this.hasMany('App/Models/HeroPicture')
    }

    maps() {
        return this.manyThrough("App/Models/MapHero", "map")
    }

    capacity() {
        return this.hasMany("App/Models/HeroCapacity")
    }
}

module.exports = Hero
