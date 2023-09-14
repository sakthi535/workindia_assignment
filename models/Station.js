const Sequalize = require('sequelize');

const bcrypt = require('bcrypt');

const config = require('../config/config')

const sequelize = new Sequalize(
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
        type: Sequalize.DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: Sequalize.DataTypes.STRING,
        unique : true
    }
},
    {
        freezeTableName: true,
    })

module.exports = StationModel
