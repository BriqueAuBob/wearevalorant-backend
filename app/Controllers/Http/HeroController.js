'use strict'

const Hero = use('App/Models/Hero')

const Helpers = use('App/Helpers/Users')

class HeroController {
    async create({request, auth}) {
        const obj = new Helpers()
        const permission_has = await obj.user_has_permission(auth, "admin")
        if( !permission_has ) {
            return { error: "You don't have permission to do that" }
        }

        const {name, release_date} = request.post()
        const date = new Date(release_date)

        const created = Hero.findOrCreate(
            {
                "name": name
            },
            {
                "name": name,
                "release_date": date,
            }
        )
        return created
    }

    async update({auth, params, request}) {
        const obj = new Helpers()
        const permission_has = await obj.user_has_permission(auth, "admin")
        if( !permission_has ) {
            return { error: "You don't have permission to do that" }
        }

        const {id} = params
        const {name, release_date} = request.post()

        const hero = await Hero.query()
            .with("pictures")
            .where("id", "=", id)
            .fetch()

        if(name) {
            hero["name"] = name
        }
        if(release_date) {
            hero["release_date"] = new Date(release_date)
        }
        hero.save()
    }

    async delete({params, auth}) {
        const obj = new Helpers()
        const permission_has = await obj.user_has_permission(auth, "admin")
        if( !permission_has ) {
            return { error: "You don't have permission to do that" }
        }

        const {id} = params

        const hero = await Hero.find(id)
        await hero.delete()
    }

    async getId({params}) {
        const {id} = params

        const hero = await Hero.query()
            .with("pictures")
            .where("id", "=", id)
            .fetch()
        return hero
    }

    async getAll({ auth }) {
        const obj = new Helpers()
        const permission_has = await obj.user_has_permission(auth, "admin")
        if( !permission_has ) {
            return { error: "You don't have permission to do that" }
        }

        const heroes = await Hero.query()
            .with("pictures")
            .fetch()

        return heroes
    }
}

module.exports = HeroController
