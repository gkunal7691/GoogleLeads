'use strict';

module.exports = (sequelize, DataTypes) => {
    let Businesses = sequelize.define('businesses', {
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
            type: DataTypes.STRING(100),
            allowNull: true
        },
        website: {
            type: DataTypes.STRING,
            allowNull: true
        },
        placeId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique:true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        }
    }, {
        tableName: 'businesses',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return Businesses
};