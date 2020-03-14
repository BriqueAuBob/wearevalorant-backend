'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ArticleLikesSchema extends Schema {
  up () {
    this.create('article_likes', (table) => {
      table.increments()
      table.integer("article_id").unsigned().references('id').inTable('articles')
      table.integer("user_id").unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('article_likes')
  }
}

module.exports = ArticleLikesSchema
