const {Sequelize, DataTypes} = require('sequelize')

const sequelizeinstance = require('./database')

const Product = sequelizeinstance.define( 'Product', {
   title: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageURL: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'products'
})

module.exports = Product