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

const SeatBookingModel = sequelize.define('Stations', {
    trainId: {
        type: Sequelize.DataTypes.UUID,
    },
    userId: {
        type: Sequelize.DataTypes.UUID,
    },
    seatNumber: {
        type: Sequelize.DataTypes.INTEGER,
    }
},
    {
        freezeTableName: true,
    })

module.exports = SeatBookingModel
