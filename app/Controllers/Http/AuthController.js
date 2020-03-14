'use strict'

const axios = require('axios');
const User = use('App/Models/User')

class AuthController {
    async authed({ auth, request }) {
        try {
            const { access_token } = request.get()

            const res = await axios.get("https://discordapp.com/api/users/@me", {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })
            const guilds = await axios.get("https://discordapp.com/api/users/@me/guilds", {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            })

            if (guilds) {
                const guild = guilds.data.find(guild => guild.id == "668550102801186857")
                console.log({guild})
                if (!guild) {
                    const join = await axios.get(`https://discordapp.com/api/guilds/668550102801186857/members/${res.data.id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bot zQWkD_NYp1qhxift5aJcDOU6q4y6i6NK`
                        },
                        params: {
                            "access_token": `Bearer ${access_token}`
                        }
                    })
                    if (join) {
                        console.log(join)
                    }
                }
            }
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
                const token = await auth.authenticator("jwt").generate(created)

                return {token: "Bearer " + token.token}
            }
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