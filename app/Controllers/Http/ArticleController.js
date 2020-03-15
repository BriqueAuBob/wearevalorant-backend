'use strict'

const User = use('App/Models/User')
const Article = use('App/Models/Article')
const ArticleLike = use("App/Models/ArticleLike")

const Helpers = use('App/Helpers/Users')

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
        const obj = new Helpers()
        const permission_has = await obj.user_has_permission(auth, "admin")
        if( !permission_has ) {
            return { error: "You don't have permission to do that" }
        }
        
        var ArticleData = request.only(["title", "subtitle", "thumbnail", "content", "metadescription"])
        const member = await auth.getUser()
        ArticleData["author_id"] = member.id

        Article.create(ArticleData)
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

    async getAll() {
        const articles = await Article.query()
            .with("author")
            .with("likes")
            .fetch()

        return articles
    }

    async delete({ auth, params }) {
        const obj = new Helpers()
        const permission_has = await obj.user_has_permission(auth, "admin")
        if( !permission_has ) {
            return { error: "You don't have permission to do that" }
        }

        const { id } = params

        const article = await Article.find(id)
        
        if (article) {
            article.delete()
        }
    }
}

module.exports = ArticleController
