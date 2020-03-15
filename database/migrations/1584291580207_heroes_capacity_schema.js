'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HeroesCapacitySchema extends Schema {
  up () {
    this.create('heroes_capacities', (table) => {
      table.increments()
      table.integer('hero_id').unsigned().references('id').inTable('heroes')
      table.string("type").notNullable()
      table.string("name", 150).notNullable()
      table.text("description")
      table.integer("damages")
      table.integer("damages_head")
      table.timestamps()
    })
  }

  down () {
    this.drop('heroes_capacities')
  }
}

module.exports = HeroesCapacitySchema
