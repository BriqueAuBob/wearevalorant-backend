'use strict'

const Config = use( "Config" )
const Route = use('Route')
const Helpers = use('Helpers')

class UploadController {
    async upload({ auth, request, response }) {
        const pic = request.file('picture', {
            types: ['image'],
            size: '8mb'
        })

        await pic.move(Helpers.tmpPath("uploads"), {
            name: `${ new Date().getTime() }.${ pic["subtype"] }`
        })

        if (!pic.moved()) {
            return pic.errors()
        }

        return response.send(`${ Config.get( "wearevalorant.URL" ) }${ Route.url('file.get', { id: pic["fileName"] }) }`)
    }

    async get({ params, response }) {     
        return response.download(Helpers.tmpPath(`uploads/${params.id}`))
    }
}

module.exports = UploadController
