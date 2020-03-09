'use strict'

const Env = use('Env')

module.exports = {
    client_id: Env.get("DISCORD_CLIENT_ID"),
    client_secret: Env.get("DISCORD_CLIENT_SECRET")
}