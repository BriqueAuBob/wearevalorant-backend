'use strict'

const Map = use("App/Models/Map")

class MapController {
    create({ request }) {
        var MapData = request.only(["title", "content"])

        Map.create(MapData)
    }

    async delete({ params }) {
        const { id } = params

        try {
            const map = await Map.find(id)
            map.delete()
        }
        catch( err ) {
            return {error: "id doesn't match"}
        }
    }

    async getId({ params }) {
        const { id } = params

        const map = await Map.query()
            .with("heroes")
            .with("pictures")
            .where("id", id)
            .fetch()

        return map
    }

    async getAll() {
        const maps = await Map.query()
            .with("heroes")
            .with("pictures")
            .fetch()

        return maps
    }
}

module.exports = MapController
