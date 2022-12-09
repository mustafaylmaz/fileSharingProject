const fs = require('fs')
const Directory = require('../models/Directory')
const removeDir = (req,obj) => {
    Directory.destroy({where:{id:obj.id}})
    dirName = './App_Data/'+ req.session.useruId+'/'+obj.dir_name
    fs.rmdirSync(directoryPath);
}