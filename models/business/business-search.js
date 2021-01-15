'use strict';

module.exports = (sequelize, DataTypes) => {
    let BusinessSearch = sequelize.define('business-search', {
        businessId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        businessName: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        website: {
            type: DataTypes.STRING,
            allowNull: false
        },
        placeId: {
            type: DataTypes.STRING,
            allowNull: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'business-search',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return BusinessSearch
};