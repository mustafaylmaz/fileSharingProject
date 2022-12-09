const userService = require('../services/userService.js')

const getAll = async () => {
    return await userService.getAll()
}
const logOut = async (req) => {
    userService.logOut(req)
}
module.exports = {getAll, logOut}