const Directory = require("../models/Directory");
const createVirtualDir = require('../tools/createVirtualDir')
const userdirectoryService = async(req) => {

  if (req.session.userId) {
    if (!(req.body.dir_name.isEmpty) && !(req.body.dir_description.isEmpty)) {
      await createVirtualDir(req)
    }
  }
};

module.exports = userdirectoryService