'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Hero extends Model {
    static get table () {
        return 'heros'
    }

    pictures () {
        return this.hasMany('App/Models/HeroPicture')
    }
}

module.exports = Hero
