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

const File = sequelize.define("files", {
    file_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    file_extension: {
        type: DataTypes.STRING,
        allowNull: false
    },
    file_size: {
        type: DataTypes.BIGINT
    }

})

sequelize.sync()    
module.exports = File