'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MapsPicturesSchema extends Schema {
  up () {
    this.create('maps_pictures', (table) => {
      table.increments()
      table.integer('map_id').unsigned().references('id').inTable('maps')
      table.text('url')
      table.timestamps()
    })
  }

  down () {
    this.drop('maps_pictures')
  }
}

module.exports = MapsPicturesSchema
