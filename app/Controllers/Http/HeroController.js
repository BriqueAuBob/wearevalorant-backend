'use strict'

const User = use('App/Models/User')
const Hero = use('App/Models/Hero')
const HeroPicture = use('App/Models/HeroPicture')

class HeroController {
    async create({request}) {
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

    async update({params, request}) {
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

    async delete({params}) {
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

    async getAll() {
        const heroes = await Hero.query()
            .with("pictures")
            .fetch()

        return heroes
    }
}

module.exports = HeroController
