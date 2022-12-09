var fs = require('fs');
var dir = './App_Data';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

module.exports = dir