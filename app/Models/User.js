'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class User extends Model {
  static boot () {
    super.boot()
  }

  permissions () {
    return this.hasMany("App/Models/Permission")
  }

  tokens () {
    return this.hasMany('App/Models/Token')
  }

  friends() {
    return this.manyThrough("App/Models/Friend", "friend")
  }
}

module.exports = User
