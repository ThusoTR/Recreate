const sequelizeinstance = require('./database')

const Cart = require('./cart')
const Order = require('./order')
const Product = require('./products')
const User = require('./user')

let User_Record = User.create({
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

let Cart_For_User = Cart.create({
    totalPrice: 0,
    dateCreated: Date.now(),
    dateUpdated: Date.now()
})
.then(() => {
    console.log('User Created:', {
        firstname: 'Thuso',
        lastName: 'tshishonga',
        dateCreated: Date.now(),
        dateUpdated: Date.now()
    })
}).catch((error) =>{
    console.log('User not created:', error)
})
//Cart_For_User.belongsTo(User_Record)
//User_Record.hasOne(Cart_For_User)

User_Record.findById(1)

exports.User = User_Record
exports.Cart = Cart_For_User


