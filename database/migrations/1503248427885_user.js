'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      table.string('discord_id').notNullable().unique()
      table.string('username').notNullable()
      table.string('discriminator', 4).notNullable()
      table.string('avatar').notNullable()
      table.boolean('isAdmin')
      table.boolean('isRedactor')
      table.boolean('isBooster')
      table.timestamps()
    })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
