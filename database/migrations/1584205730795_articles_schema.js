'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticlesSchema extends Schema {
  up () {
    this.create('articles', (table) => {
      table.increments()
      table.integer("author_id").unsigned().references('id').inTable('users')
      table.string("origin", 4).notNullable()
      table.string("title", 150).notNullable()
      table.string("subtitle", 150)
      table.string("metadescription")
      table.text("thumbnail").notNullable()
      table.text("content").notNullable()
      table.text("slug").notNullable()
      table.boolean("published").notNullable().defaultTo(false)
      table.boolean("is_translated").defaultTo(false)
      table.timestamps()
    })
  }

  down () {
    this.drop('articles')
  }
}

module.exports = ArticlesSchema
