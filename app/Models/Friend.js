'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Friend extends Model {
    user() {
        return this.belongsTo("App/Models/User", "user_id", "id")
    }

    friend() {
        return this.belongsTo("App/Models/User", "friend_id", "id")
    }
}

module.exports = Friend
