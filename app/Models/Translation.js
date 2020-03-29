'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Translation extends Model {
    static get table () {
        return 'articles_translations'
    }
}

module.exports = Translation
