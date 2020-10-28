const {Sequelize} = require('sequelize')

const sequleInstance = new Sequelize('shopdatabase', 'root', '20270', {
    host: 'localhost',
    dialect: 'mysql',
})

// try {
//     sequleInstance.authenticate();
//     console.log('Connection has been established successfully.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

module.exports = sequleInstance