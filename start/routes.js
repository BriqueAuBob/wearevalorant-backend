'use strict'

const Route = use('Route')

Route.get('/upload', "UploadController.upload")

Route.get('/authenticated/discord', "AuthController.authed")
Route.get('/logout', "AuthController.logout")
Route.get('/me', "AuthController.me")

Route.group(() => {
    Route.post('create', "HeroController.create")
    Route.post(':id/update', "HeroController.update")
    Route.get(':id/delete', "HeroController.delete")
    Route.get(':id', "HeroController.getId")
    Route.get('/', "HeroController.getAll")
}).prefix("heroes")

Route.group(() => {
    Route.post("create", "ArticleController.create")
    Route.get(":id/delete", "ArticleController.delete")
    Route.get(":id", "ArticleController.getId")
    Route.post(":id/like", "ArticleController.like")
    Route.get("/", "ArticleController.getAll")
}).prefix("articles")

Route.group(() => {
    Route.post("create", "UrlShortenerController.create")
    Route.get(':url', "UrlShortenerController.go")
}).prefix("url")

Route.group(() => {
    Route.get("streams", "TwitchController.Streams")
    Route.get("clips", "TwitchController.Clips")
}).prefix("twitch")