'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class ShortenedUrl extends Model {
    static get table () {
        return 'shortened_urls'
    }
}

module.exports = ShortenedUrl
