const {Sequelize, DataTypes} = require('sequelize')

const sequelizeinstance = require('./database')

const Cart = sequelizeinstance.define( 'Cart', {
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    dateCreated: {
        type: DataTypes.DATE,
        allowNull: false,
   },
    dateUpdated: {
        type: DataTypes.DATE,
        allowNull: false,
 },
}) 
 
 module.exports = Cart  