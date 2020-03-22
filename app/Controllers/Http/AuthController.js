'use strict'

const axios = require('axios');
const Config = use('Config')
const User = use('App/Models/User')
const Permission = use('App/Models/Permission')
const Friend = use('App/Models/Friend')
const Notification = use('App/Models/Notification')

const Helpers = use('App/Helpers/Users')

const client_id = Config.get("wearevalorant.discord_client_id")
const redirect_uri_notencoded = Config.get("wearevalorant.redirect_uri")

const redirect_uri = encodeURIComponent(redirect_uri_notencoded)
const redirect_to = `https://discordapp.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=guilds%20guilds.join%20identify`

class AuthController {
    auth() {
        return redirect_to
    }
    
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
            return { error: 'Not logged' }
        }
    }

    async friendsList({ auth }) {
        try {
            //await auth.check()
            //const user = await auth.getUser()
            var user = []
            user.id = 2

            const friends = await User.query()
                .where("id", user["id"])
                .with("friends")
                .fetch()

            return friends
        }
        catch {
            return { error: 'Not logged' }
        }
    }

    async friendAdd({ auth, request }) {
        try {
            const data = request.only(["user_id"])
            await auth.check()
            const user = await auth.getUser()
            
            const friend = await Friend.findOrCreate(
                {
                    "user_id": user["id"],
                    "friend_id": data["user_id"]
                },
                {
                    "user_id": user["id"],
                    "friend_id": data["user_id"]
                }
            )

            const membertwo = await User.find(data["user_id"])

            const obj = new Helpers()
            obj.user_create_notify( user["id"], "Friend request sent", `Your friend request to ${ membertwo["username"] }#${ membertwo["discriminator"] } has been sent.`, `https://cdn.discordapp.com/avatars/${ membertwo["discord_id"] }/${ membertwo["avatar"] }.png?size=128` )
            obj.user_create_notify( data["user_id"], "New friend request", `${ user["username"] }#${ user["discriminator"] } sent you a friend request.`, `https://cdn.discordapp.com/avatars/${ user["discord_id"] }/${ user["avatar"] }.png?size=128` )

            return friend
        }
        catch(error) {
            console.log(error)
            return { error: "Not logged" }
        }
    }

    async friendRequestAnswer({ auth, params, request }) {
        try {
            const data = request.only(["answer"])
            const { id } = params

            await auth.check()
            const user = await auth.getUser()

            const req = await Friend.find(id)
            if(req["friend_id"] == user.id) {
                req.accepted = data.answer == "true" ? true : false
                if (req.accepted == true) {
                    req.save()
                    Friend.create(
                        {
                            "user_id": user.id,
                            "friend_id": req["user_id"],
                            "accepted": true,
                        }
                    )
                } else {
                    req.delete()
                }
            }
        }
        catch {
            return { error: "Not logged" }
        }
    }

    async notifyGet({ auth }) {
        try {
            //await auth.check()
            //const user = await auth.getUser()
            var user = []
            user.id = 2

            const notifications = Notification.query()
                .where("user_id", user.id)
                .fetch()

            return notifications
        }
        catch {
            return { error: "Not logged" }
        }
    }

    async notifyRead({ auth, params }) {
        try {
            const { id } = params
            await auth.check()
            const user = await auth.getUser()

            const notif = await Notification.find(id)
            if (notif.user_id == user.id) {
                notif.is_read = true
                notif.save()
            }
        }
        catch {
            return { error: "Not logged" }
        }
    }

    async notifyDelete({ auth, params }) {
        try {
            const { id } = params
            await auth.check()
            const user = await auth.getUser()

            const notif = await Notification.find(id)
            if (notif.user_id == user.id) {
                notif.delete()
            }
        }
        catch {
            return { error: "Not logged" }
        }
    }
}

module.exports = AuthController