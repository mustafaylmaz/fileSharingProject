const {Sequelize, DataTypes} = require('sequelize')
const sequelize = new Sequelize(
    'filesharing',
    'root',
    '',
     {
       host: 'localhost',
       dialect: 'mysql'
     }
   );
const Directory = require('./Directory.js');
const File = require('./File.js');

const User = sequelize.define("users", {
    user_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    email_Address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
User.hasMany(Directory)
User.hasMany(File)
sequelize.sync()    
module.exports = User