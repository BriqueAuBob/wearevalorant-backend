'use strict'

const Helpers = use('Helpers')

class UploadController {
    async upload({auth, request}) {
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

        console.log( `${ pic["_location"] }/${ pic["fileName"] }` )
        return `${ pic["_location"] }/${ pic["fileName"] }`
    }
}

module.exports = UploadController
