const userdirectoryService = require('../services/directoryService')

const addDirectory = (req) => {
    userdirectoryService(req)
}

module.exports = addDirectory