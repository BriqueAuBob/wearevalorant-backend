'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MapsSchema extends Schema {
  up () {
    this.create('maps', (table) => {
      table.increments()
      table.string("title", 140).notNullable()
      table.text("content")
      table.timestamps()
    })
  }

  down () {
    this.drop('maps')
  }
}

module.exports = MapsSchema
