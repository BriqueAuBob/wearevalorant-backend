'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class HerosPicturesSchema extends Schema {
  up () {
    this.create('hero_pictures', (table) => {
      table.increments()
      table.integer('hero_id').unsigned().references('id').inTable('heros').onDelete('CASCADE')
      table.text('url')
      table.timestamps()
    })
  }

  down () {
    this.drop('heroes_pictures')
  }
}

module.exports = HerosPicturesSchema
