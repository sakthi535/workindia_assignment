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

const UserModel = sequelize.define('Users', {
    userId: {
        type: Sequalize.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequalize.DataTypes.STRING,
        unique : true
    },
    password: {
        type: Sequalize.DataTypes.STRING,
    },
    email: {
        type: Sequalize.DataTypes.STRING,
        unique : true
    },
    isAdmin : {
        type : Sequalize.DataTypes.BOOLEAN,
        defaultValue: false
    }
},
    {
        freezeTableName: true,
        hooks: {
            beforeCreate: (user) => {
                const salt = bcrypt.genSaltSync();
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    })

UserModel.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}



module.exports = UserModel
