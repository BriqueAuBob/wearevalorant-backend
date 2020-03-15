'use strict'

const Hero = use('App/Models/Hero')

class HeroController {
    async create({request, auth}) {
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
        const {id} = params

        const hero = await Hero.find(id)
        await hero.delete()
    }

    async getId({params}) {
        const {id} = params

        const hero = await Hero.query()
            .with("maps")
            .with("pictures")
            .with("capacity")
            .where("id", "=", id)
            .fetch()
        return hero
    }

    async getAll({ auth }) {
        const heroes = await Hero.query()
            .with("maps")
            .with("pictures")
            .with("capacity")
            .fetch()

        return heroes
    }
}

module.exports = HeroController
