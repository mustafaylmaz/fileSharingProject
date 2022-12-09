const User = require('../models/User.js')


const getAll = async() => {
    return await User.getAll

}
const logOut = async(req) => {
    req.session.destroy();
}
module.exports = {getAll, logOut}