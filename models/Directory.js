const {Sequelize, DataTypes} = require('sequelize')
const File = require('./File')
const sequelize = new Sequelize(
    'filesharing',
    'root',
    '',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );

const Directory = sequelize.define("directories", {
    
    dir_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dir_description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Directory.hasMany(File)
sequelize.sync()    
module.exports = Directory