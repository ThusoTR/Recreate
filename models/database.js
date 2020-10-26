const {Sequelize} = require('sequelize')

const sequleInstance = new Sequelize('shop_products', 'root', '20270', {
    host: 'localhost',
    dialect: 'mysql',
})

module.exports = sequleInstance