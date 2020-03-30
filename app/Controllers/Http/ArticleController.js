'use strict'

const User = use('App/Models/User')
const Article = use('App/Models/Article')
const ArticleLike = use("App/Models/ArticleLike")
const Translation = use("App/Models/Translation")

const axios = require( "axios" )
const Config = use( "Config" )

class ArticleController {
    async like_article (user, id) {
        const search = await ArticleLike.query()
            .where("user_id", user)
            .where("article_id", id)
            .first()
            
        if (search) {
            search.delete()
        } else {    
            ArticleLike.create(
                {
                    "user_id": user,
                    "article_id": id,
                },
            )
        }
    }

    like({ params }) {
        const { id } = params
        const user = 2
        
        this.like_article(user, id)
    }

    async create({ request, auth }) {
        var ArticleData = request.only(["origin", "title", "subtitle", "thumbnail", "content", "metadescription", "published"])
        //const member = await auth.getUser()
        ArticleData["author_id"] = 1

        const article = await Article.create(ArticleData)
        return { created: article.id }
    }

    async update({params, request}) {
        const {id} = params
        const {origin, title, subtitle, metadescription, thumbnail, content, published} = request.post()

        const article = await Article.find( id )

        if(origin) {
            article["origin"] = origin
        }
        if(title) {
            article["title"] = title
        }
        if(subtitle) {
            article["subtitle"] = subtitle
        }
        if(metadescription) {
            article["metadescription"] = metadescription
        }
        if(thumbnail) {
            article["thumbnail"] = thumbnail
        }
        if(content) {
            article["content"] = content
        }
        if(published) {
            article["published"] = published
        }
        article.save()
    }

    async getId({ params, response }) {
        const { slug } = params

        const article = await Article.query()
        .with("translation")
        .with("author")
        .with("likes")
        .where("slug", slug)
        .where("published", true)
        .first()

        if(!article) {
            response.status(404).send( "Sorry we didn't find the post" )
        }

        return article
    }

    async getAll({ request }) {
        const { limit } = request.get()

        if ( limit ) {
            const articles = await Article.query()
                .with("translation")
                .with("author")
                .with("likes")
                .where("published", true)
                .orderBy('id', 'DESC')
                .limit( limit )
                .fetch()

            return articles
        }
        
        const articles = await Article.query()
            .with("translation")
            .with("author")
            .with("likes")
            .where("published", true)
            .orderBy('id', 'DESC')
            .fetch()

        return articles
    }

    async adminGet({ params }) {
        const {id} = params

        const article = Article.query()
            .with( "translation" )
            .with( "author" )
            .with( "likes" )
            .where("id", id)
            .first()

        return article
    }

    async adminGetAll() {
        const articles = await Article.query()
            .with("translation")
            .with("author")
            .with("likes")
            .fetch()

        return articles
    }

    async delete({ auth, params }) {
        const { id } = params

        const article = await Article.find(id)
        
        if (article) {
            article.delete()
        }
    }

    async translate({ params }) {
        const { id } = params

        const article = await Article.find( id )

        if( article.is_translated ) {
            return { error: "Sorry but this article has already been translated." }
        }

        const deepl_url = `https://api.deepl.com/v2/translate?tag_handling=xml&source_lang=${ article.origin.toUpperCase() }&target_lang=${ article.origin === "fr" ? "EN" : "FR" }&auth_key=${ Config.get("wearevalorant.deepl_key") }`
        
        let title, subtitle, content
        if( article.title ) {
            const { data } = await axios.get( `${ deepl_url }&text=${ article.title }` )
            if (data.translations && data.translations[0]) {
                title = data.translations[0].text
            }
        }
        if( article.subtitle ) {
            const { data } = await axios.get( `${ deepl_url }&text=${ article.subtitle }` )

            if (data.translations && data.translations[0]) {
                subtitle = data.translations[0].text
            }
        }
        if( article.content ) {
            const { data } = await axios.get( `${ deepl_url }&text=${ article.content }` )

            if (data.translations && data.translations[0]) {
                content = data.translations[0].text
            }
        }

        Translation.create( {
            "article_id": article.id,
            "language": article.origin === "fr" ? "en" : "fr",
            "title": title,
            "subtitle": subtitle,
            "content": content
        } )

        article.is_translated = true
        article.save()
    }

    async updateTranslate({ params, request }) {
        const { id } = params
        const { title, subtitle, content } = request.post()

        const translated = await Translation.find( id )

        if(title) {
            translated["title"] = title
        }
        if(subtitle) {
            translated["subtitle"] = subtitle
        }
        if(content) {
            translated["content"] = content
        }
        translated.save()
    }
}

module.exports = ArticleController
