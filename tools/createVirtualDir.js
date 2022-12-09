

var fs = require('fs');
const Directory = require('../models/Directory')


const createDir=async(req)=> {
var dir = './App_Data/'+req.session.useruId+'/'+req.body.dir_name+'/';
if (!fs.existsSync(dir)){
    await fs.mkdirSync(dir);
    await Directory.create({
        dir_name: req.body.dir_name,
        dir_description: req.body.dir_description,
        userId: req.session.userId
    })
}}

module.exports = createDir