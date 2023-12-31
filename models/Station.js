const Sequelize = require('sequelize');

const bcrypt = require('bcrypt');

const config = require('../config/config')

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        dialect: 'postgres',
        omitNull: true
    }
)

const StationModel = sequelize.define('Stations', {
    stationId: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        unique : true
    }
},
    {
        freezeTableName: true,
    })

module.exports = StationModel
