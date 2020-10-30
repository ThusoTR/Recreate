const sequelizeinstance = require('./database')

const Cart = require('./cart')
const Order = require('./order')
const Product = require('./products')
const User = require('./user')

const assosciations = require('./databaseAdmin') //allows for model assosciation to be visible in this file


const User_Record = User.create({
    firstName: 'Thuso',
    lastName: 'tshishonga',
    dateCreated: Date.now(),
    dateUpdated: Date.now()
})
.then((User_Model) => {
    console.log('User Created:', User_Model.firstName)

    User_Model.createCart({
    
            totalPrice: 0,
            dateCreated: Date.now(),
            dateUpdated: Date.now(),
            UserId: 1,
        })
    return Promise.resolve(User_Model)
    
}).catch((error) =>{
    console.log('User not created:', error)
})

exports.User = User_Record