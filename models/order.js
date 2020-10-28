const {Sequelize, DataTypes} = require('sequelize')

const sequelizeinstance = require('./database')

const Order = sequelizeinstance.define( 'Order', {
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    deliveryType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    dateCompleted: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}) 
 
 // Product.sync()
 
 module.exports = Order  