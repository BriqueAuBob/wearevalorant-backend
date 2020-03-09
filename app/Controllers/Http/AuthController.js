'use strict'

const auth = require("@adonisjs/auth")
const DiscordOauth2 = require("discord-oauth2");

const User = use("App/Models/User")

const Config = use("Config")
const client_id = Config.get("discord.client_id")
const client_secret = Config.get("discord.client_secret")

const redirect_uri = encodeURIComponent("http://127.0.0.1:3333/authentification/discord/handle")
const redirect_to = `https://discordapp.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=guilds%20guilds.join%20identify`

const oauth = new DiscordOauth2();

class AuthController {
    authenticate({ response }) {
        return response.redirect(redirect_to)
    }

    handle({request}) {
        const { code } = request.all()
        
        const $token = new Promise(async function(resolve) {
            const $r = await oauth.tokenRequest({
                clientId: client_id,
                clientSecret: client_secret,
            
                code: code,
                scope: "guilds.join%20guilds%20identify",
                grantType: "authorization_code",
                
                redirectUri: "http://127.0.0.1:3333/authentification/discord/handle"
            })

            resolve($r)
        })

        $token.then(function(result) {
            const $getuser = new Promise(function(resolve) {
                const $user = oauth.getUser(result["access_token"])
                resolve($user)
            })
              
            $getuser.then(async (user) => {
                const member = await User.findOrCreate(
                    {
                        discord_id: user["id"]
                    },
                    {
                        discord_id: user["id"],
                        username: user["username"],
                        discriminator: user["discriminator"],
                        avatar: user["avatar"],
                    }
                ).then(async (created) => {
                    await auth.login(created["$attributes"]["username"])
                })
                .catch((err) => {
                    console.log(err)
                }) 
            } )
        } )
    }
}

module.exports = AuthController