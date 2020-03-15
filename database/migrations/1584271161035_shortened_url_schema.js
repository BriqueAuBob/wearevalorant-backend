'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ShortenedUrlSchema extends Schema {
  up () {
    this.create('shortened_urls', (table) => {
      table.increments()
      table.string("short_url").notNullable().unique()
      table.string("url").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('shortened_urls')
  }
}

module.exports = ShortenedUrlSchema
