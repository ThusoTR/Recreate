const sequelizeinstance = require('./database')

const Cart = require('./cart')
const Order = require('./order')
const Product = require('./products')
const User = require('./user')

exports.User = User.create({
    firstName: 'Thuso',
    lastName: 'tshishonga',
    dateCreated: Date.now(),
    dateUpdated: Date.now()
}).then(() => {
    console.log('User Created:', {
        firstname: 'Thuso',
        lastName: 'tshishonga',
        dateCreated: Date.now(),
        dateUpdated: Date.now(),
    })
}).catch((error) =>{
    console.log('User not created:', error)
})

exports.Cart = Cart.create({
    totalPrice: 0,
    dateCreated: Date.now(),
    dateUpdated: Date.now()
}).then(() => {
    console.log('User Created:', {
        firstname: 'Thuso',
        lastName: 'tshishonga',
        dateCreated: Date.now(),
        dateUpdated: Date.now()
    })
}).catch((error) =>{
    console.log('User not created:', error)
})

