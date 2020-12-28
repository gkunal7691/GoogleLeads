'use strict';

module.exports = (sequelize, DataTypes) => {
    let Professionals = sequelize.define('professionals', {
        proId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        introduction: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(11),
            allowNull: true,
        },
        dob: {
            type: DataTypes.STRING(10),
            allowNull: true,
        },
        skills: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
    }, {
        tableName: 'professionals',
        paranoid: true,
        timestamps: true,
        freezeTableName: true
    });
    return Professionals
};