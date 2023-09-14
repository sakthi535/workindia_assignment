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

const TrainModel = sequelize.define('Trains', {
    trainId: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    },
    name: {
        type: Sequelize.DataTypes.STRING,
        unique : true
    },
    max_capacity: {
        type: Sequelize.DataTypes.INTEGER
    },
    arrival_time_at_source : {
        type : Sequelize.DataTypes.TIME
    },
    arrival_time_at_destination : {
        type : Sequelize.DataTypes.TIME
    },
    source : {
        type: Sequelize.DataTypes.UUID,
    },
    destination : {
        type: Sequelize.DataTypes.UUID,
    }

},
    {
        freezeTableName: true
    })

module.exports = TrainModel
