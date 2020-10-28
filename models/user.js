const {Sequelize, DataTypes} = require('sequelize')

const sequelizeinstance = require('./database')

const User = sequelizeinstance.define( 'User', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
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
}) 
 
 // Product.sync()
 
 module.exports = User  