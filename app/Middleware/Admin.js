'use strict'

const Helpers = use('App/Helpers/Users')

class Admin {
  async handle ({ auth, response }, next) {
    const obj = new Helpers()
    const permission_has = await obj.user_has_permission(auth, "admin")
    if( !permission_has ) {
      return response.send({ error: "You don't have permission to do that" })
    } else {
      await next()
    }
  }
}

module.exports = Admin
