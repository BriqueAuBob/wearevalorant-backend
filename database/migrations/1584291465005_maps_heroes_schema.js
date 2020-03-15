'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MapsHeroesSchema extends Schema {
  up () {
    this.create('maps_heroes', (table) => {
      table.increments()
      table.integer('hero_id').unsigned().references('id').inTable('heroes')
      table.integer('map_id').unsigned().references('id').inTable('maps')
      table.timestamps()
    })
  }

  down () {
    this.drop('maps_heroes')
  }
}

module.exports = MapsHeroesSchema
