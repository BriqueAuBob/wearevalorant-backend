'use strict'

const Route = use('Route')

Route.post('/upload', "UploadController.upload")

Route.get('/file/:id', "UploadController.get").as('file.get')

// Authentification Routes
Route.get('/login', "AuthController.auth")
Route.get('/login/discord', "AuthController.authed")
Route.get('/logout', "AuthController.logout")

// Me Routes
Route.group(() => {
    Route.get('/', "AuthController.me")
    Route.get("friends", "AuthController.friendsList")
    Route.post("friends/add", "AuthController.friendAdd")
    Route.post("friends/:id/answer", "AuthController.friendRequestAnswer")

    Route.get("notifications", "AuthController.notifyGet")
    Route.get("notifications/:id/read", "AuthController.notifyRead")
    Route.get("notifications/:id/delete", "AuthController.notifyDelete")
}).prefix("me")

// Articles Routes
Route.group(() => {
    Route.post(":id/like", "ArticleController.like")
    Route.get(":id", "ArticleController.getId")
    Route.get("/", "ArticleController.getAll")
}).prefix("articles")

// Heroes Routes
Route.group(() => {
    Route.get(':id', "HeroController.getId")
    Route.get('/', "HeroController.getAll")
}).prefix("heroes")

// Maps Routes
Route.group(() => {
    Route.get(":id", "MapController.getId")
    Route.get("/", "MapController.getAll")
}).prefix("maps")

// URL Routes
Route.group(() => {
    Route.get(':url', "UrlShortenerController.go")
}).prefix("url")

// Twitch Routes
Route.group(() => {
    Route.get("streams", "TwitchController.Streams")
    Route.get("clips", "TwitchController.Clips")
}).prefix("twitch")

// Admin Routes
Route.group(() => {
    Route.post("url", "UrlShortenerController.create")

    Route.post("articles/", "ArticleController.create")
    Route.put("articles/:id", "ArticleController.update")
    Route.delete("articles/:id/delete", "ArticleController.delete")

    Route.post('hero/', "HeroController.create")
    Route.put('hero/:id', "HeroController.update")
    Route.delete('hero/:id/delete', "HeroController.delete")

    Route.post("map/", "MapController.create")
    Route.delete("map/:id/delete", "MapController.delete")

    Route.get("articles", "ArticleController.getUnpublished")
}).prefix("admin").middleware("admin")