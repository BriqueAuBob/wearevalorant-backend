'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TranslationsSchema extends Schema {
  up () {
    this.create('articles_translations', (table) => {
      table.increments()
      table.integer("article_id").unsigned().references('id').inTable('articles')
      table.string("language", 4)
      table.string("title", 150).notNullable()
      table.string("subtitle", 150)
      table.text("content").notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('articles_translations')
  }
}

module.exports = TranslationsSchema
