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

const TrainModel = sequelize.define('Trains', {
    trainId: {
        type: Sequalize.DataTypes.UUID,
        primaryKey: true
    },
    name: {
        type: Sequalize.DataTypes.STRING,
        unique : true
    },
    max_capacity: {
        type: Sequalize.DataTypes.INTEGER
    },
    depature_time : {
        type : Sequalize.DataTypes.TIME
    },
    arrival_time :{
        type : Sequalize.DataTypes.TIME
    },
    source : {
        type: Sequalize.DataTypes.UUID,
    },
    destination : {
        type: Sequalize.DataTypes.UUID,
    }

},
    {
        freezeTableName: true
    })

module.exports = TrainModel
