'use strict'

const Helpers = use('Helpers')

class UploadController {
    upload() {
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
