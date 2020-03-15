'use strict'

const Helpers = use('App/Helpers/Users')

class UploadController {
    async upload({auth}) {
        const obj = new Helpers()
        const permission_has = await obj.user_has_permission(auth, "admin")
        if( !permission_has ) {
            return { error: "You don't have permission to do that" }
        }

        const pics = request.file('pictures', {
            types: ['image'],
            size: '8mb'
        })

        await pics.moveAll(Helpers.tmpPath("uploads"), (file) => {
            console.log(file)
            return {
              name: `${new Date().getTime()}.${file.subtype}`
            }
          })

        if (!pics.movedAll()) {
            return pics.errors()
        }

        return "Sended"
    }
}

module.exports = UploadController
