'use strict';

module.exports = (sequelize, DataTypes) => {
    let Apikey = sequelize.define('apikey', {
        apikeyId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        apikey: {
            type: DataTypes.STRING,
            allowNull: false
        },
    }, {
        tableName: 'apikey',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return Apikey
};