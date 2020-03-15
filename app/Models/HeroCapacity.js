'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class HeroCapacity extends Model {
    static get table() {
        return "heroes_capacities"
    }
}

module.exports = HeroCapacity
