'use strict'

const Route = use('Route')

Route.get('/authenticated/discord', "AuthController.authed")
Route.get('/logout', "AuthController.logout")
Route.get('/me', "AuthController.me")

Route.post('/hero/create', "HeroController.create")
Route.post('/hero/:id/update', "HeroController.update")
Route.get('/hero/:id/delete', "HeroController.delete")
Route.get('/hero/:id', "HeroController.getId")
Route.get('/heroes', "HeroController.getAll")

Route.post("/article/create", "ArticleController.create")
Route.get("/article/:id/delete", "ArticleController.delete")
Route.get("/articles", "ArticleController.getAll")
Route.get("/article/:id", "ArticleController.getId")
Route.post("/article/:id/like", "ArticleController.like")

Route.get('/upload', "UploadController.upload")