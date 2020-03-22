"use strict"

const { ServiceProvider } = require('@adonisjs/fold')

const User = use("App/Models/User")
const Permission = use("App/Models/Permission")
const Notification = use("App/Models/Notification")

class UsersHelper extends ServiceProvider {
    async user_has_permission(auth, permission_name) {
        const { id } = auth.user
        const permissions = await Permission.query()
            .where("user_id", id)
            .fetch()

        const user = permissions.toJSON()
        var has = false

        user.map(role => {
            if (role.type === permission_name) {
                has = true
            }
        })

        return has
    }

    async user_create_notify( id, title, content, thumbnail ) {
        const notif = await Notification.findOrCreate(
            {
                "user_id": id,
                "title": title,
                "content": content,
                "is_read": false,
            },
            {
                "user_id": id,
                "title": title,
                "content": content,
                "thumbnail": thumbnail,
            }
        )

        return notif
    }
}

module.exports = UsersHelper