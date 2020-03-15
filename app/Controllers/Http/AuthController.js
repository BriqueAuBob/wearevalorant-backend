'use strict'

const axios = require('axios');
const Config = use('Config')
const User = use('App/Models/User')
const Permission = use('App/Models/Permission')

class AuthController {
    async authed({ auth, request }) {
        try {
            const { access_token } = request.get()

            const res = await axios.get("https://discordapp.com/api/users/@me", {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            var token = null
            var userid = null
            if (res) {
                const { id, username, discriminator, avatar } = res.data
                const created = await User.findOrCreate(
                    {
                        "discord_id": id
                    },
                    {
                        "discord_id": id,
                        "username": username,
                        "discriminator": discriminator,
                        "avatar": avatar,
                    }
                )
                token = await auth.authenticator("jwt").generate(created)
                userid = created.id
            }

            const guilds = await axios.get("https://discordapp.com/api/users/@me/guilds", {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            if (guilds) {
                const guild = guilds.data.find(guild => guild.id == Config.get("wearevalorant.guild_id"))

                if (guild) {
                    const { data } = await axios.get(`https://discordapp.com/api/guilds/${guild.id}/members/${res.data.id}`, {
                        headers: {
                            "Authorization": `Bot ${ Config.get("wearevalorant.bot_token") }`
                        }
                    })

                    if (data.roles && data.roles.length) {
                        const roles = Config.get("wearevalorant.roles")

                        data.roles.map(role => {
                            if (roles.find(i => i.id === role)) {
                                Permission.create({
                                    "user_id": userid,
                                    "type": roles.find(i => i.id === role).title,
                                })
                            }
                        })
                    }
                }
                if (!guild) {
                    const join = await axios.put(`https://discordapp.com/api/guilds/${Config.get("wearevalorant.roles")}/members/${res.data.id}`, {
                            "access_token": `${access_token}`
                        },
                        { 
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bot ${ Config.get("wearevalorant.bot_token") }`
                            }
                        }
                    )
                }
            }
            return {token: "Bearer " + token.token}
        } catch (error) {
            console.log(error)
            return "Unable to authenticate. Try again later"
        }
    }

    async logout({ auth, response }) {
        await auth.logout()
        return response.route("/")
    }

    async me({auth, request}) {
        try {
            await auth.check()
            const user = await auth.getUser()
            return { me: user }
        }
        catch {
            return "{ error: 'not logged' }"
        }
    }
}

module.exports = AuthController