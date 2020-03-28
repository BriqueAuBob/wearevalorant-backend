'use strict'

const axios = require("axios")
const Config = use("Config")

class TwitchController {
    async Streams({ request }) {
        try {
            const { limit } = request.get()

            const { data } = await axios.get(`https://api.twitch.tv/kraken/streams/?game=Overwatch&limit=${ limit || 6 }`, {
                headers: {
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Client-ID": Config.get("wearevalorant.twitch_token")
                }
            })
            return data.streams
        }
        catch(error) {
            console.log(error)
        }
    }

    async Clips() {
        try {
            const { data } = await axios.get("https://api.twitch.tv/kraken/clips/top?game=Overwatch&period=day&limit=20", {
                headers: {
                    "Accept": "application/vnd.twitchtv.v5+json",
                    "Client-ID": Config.get("wearevalorant.twitch_token")
                }
            })
            return data.clips
        }
        catch(error) {
            console.log(error)
        }
    }
}

module.exports = TwitchController
