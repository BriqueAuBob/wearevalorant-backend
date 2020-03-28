'use strict'

const User = use('App/Models/User')
const Article = use('App/Models/Article')
const ArticleLike = use("App/Models/ArticleLike")

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
        var ArticleData = request.only(["title", "subtitle", "thumbnail", "content", "metadescription"])
        const member = await auth.getUser()
        ArticleData["author_id"] = member.id

        Article.create(ArticleData)
    }

    async update({params, request}) {
        const {id} = params
        const {title, subtitle, metadescription, thumbnail, content, published} = request.post()

        const article = await Article.query()
            .where("id", "=", id)
            .fetch()

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

    async getId({ params }) {
        const { id } = params

        const article = await Article.query()
            .with("author")
            .with("likes")
            .where("id", "=", id)
            .fetch()
        return article
    }

    async getAll({ request }) {
        const { limit } = request.get()

        if ( limit ) {
            const articles = await Article.query()
                .with("author")
                .with("likes")
                .where("published", true)
                .orderBy('id', 'DESC')
                .limit( limit )
                .fetch()

            return articles
        }
        
        const articles = await Article.query()
            .with("author")
            .with("likes")
            .where("published", true)
            .orderBy('id', 'DESC')
            .fetch()

        return articles
    }

    async getUnpublished() {
        const articles = await Article.query()
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
}

module.exports = ArticleController
