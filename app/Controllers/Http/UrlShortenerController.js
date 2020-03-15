'use strict'

const ShortenedUrl = use("App/Models/ShortenedUrl")

class UrlShortenerController {
    create({ request }) {
        const { name, url } = request.all()

        ShortenedUrl.findOrCreate(
            {
                "short_url": name
            },
            {
                "short_url": name,
                "url": url
            }
        )
    }

    async go({ params, response }) {
        const { url } = params

        const short = await ShortenedUrl.query()
            .where("short_url", url)
            .first()

        if( short ) {
            return response.redirect(short["url"])
        } else {
            return { error: 'no link found' }
        }
    }
}

module.exports = UrlShortenerController
