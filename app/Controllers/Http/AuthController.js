'use strict'

const User = use('App/Models/User')

class AuthController {
    async authenticate({ally}) {
        await ally.driver("discord")
            .scope(["identify", "email", "guilds", "guilds.join"])
            .redirect()
    }

    async authed({ally, auth}) {
        try {
            const user = await ally.driver("discord").getUser()
            const { id, username, discriminator } = user._original
            const avatar = user.getAvatar()

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
            await auth.login(created)
      
            return created
        } catch (error) {
            console.log(error)
            return "Unable to authenticate. Try again later"
        }
    }

    async logout({auth, response}) {
        await auth.logout()
        return response.route("/")
    }

    async me({auth}) {
        try {
            return await auth.getUser()
        }
        catch {
            return "{ error: 'not logged' }"
        }
    }
}

module.exports = AuthController