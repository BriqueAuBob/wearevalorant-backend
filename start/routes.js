'use strict'

const Route = use('Route')

Route.post('/upload', "UploadController.upload")

Route.get('/file/:id', "UploadController.get").as('file.get')

// Authentification Routes
Route.get('/login', "AuthController.auth")
Route.get('/authenticated/discord', "AuthController.authed")
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
    Route.post("create", "ArticleController.create").middleware(["admin"])
    Route.post(":id/update", "ArticleController.update").middleware(["admin"])
    Route.post(":id/delete", "ArticleController.delete").middleware(["admin"])
    Route.get(":id", "ArticleController.getId")
    Route.post(":id/like", "ArticleController.like")
    Route.get("/", "ArticleController.getAll")
}).prefix("articles")

// Heroes Routes
Route.group(() => {
    Route.post('create', "HeroController.create").middleware(["admin"])
    Route.post(':id/update', "HeroController.update").middleware(["admin"])
    Route.post(':id/delete', "HeroController.delete").middleware(["admin"])
    Route.get(':id', "HeroController.getId")
    Route.get('/', "HeroController.getAll")
}).prefix("heroes")

// Maps Routes
Route.group(() => {
    Route.post("create", "MapController.create").middleware(["admin"])
    Route.post(":id/delete", "MapController.delete").middleware(["admin"])
    Route.get(":id", "MapController.getId")
    Route.get("/", "MapController.getAll")
}).prefix("maps")

// URL Routes
Route.group(() => {
    Route.post("create", "UrlShortenerController.create")
    Route.get(':url', "UrlShortenerController.go")
}).prefix("url")

// Twitch Routes
Route.group(() => {
    Route.get("streams", "TwitchController.Streams")
    Route.get("clips", "TwitchController.Clips")
}).prefix("twitch")

// Admin Routes
Route.group(() => {
    Route.get("articles", "ArticleController.getUnpublished")
}).prefix("admin").middleware("admin")