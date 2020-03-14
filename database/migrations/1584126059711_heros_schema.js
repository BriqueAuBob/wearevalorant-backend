'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HerosSchema extends Schema {
  up () {
    this.create('heros', (table) => {
      table.increments()
      table.string('name', 255).notNullable().unique()
      table.date('release_date')
      table.timestamps()
    })
  }

  down () {
    this.drop('heros')
  }
}

module.exports = HerosSchema
