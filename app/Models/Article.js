'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Article extends Model {
    static boot () {
        super.boot()
     
        this.addTrait('@provider:Lucid/Slugify', {
          fields: { slug: 'title' },
          strategy: 'dbIncrement',
          disableUpdates: true
        })
    }

    translation () {
        return this.hasOne( "App/Models/Translation" )
    }   
     
    author () {
        return this.belongsTo('App/Models/User', "author_id", "id")
    }

    likes () {
        return this.hasMany("App/Models/ArticleLike")
    }
}

module.exports = Article
