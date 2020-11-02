const sequelizeinstance = require('./database')

const Cart = require('./cart')
const Order = require('./order')
const Product = require('./products')
const User = require('./user')


//Database table relationships

User.hasOne(Cart, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    foreignKey: {
      allowNull: false,
    } 
  })
Cart.belongsTo(User, {
 
})

User.hasMany(Product, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',  
    foreignKey:{
      allowNull: false,
    }
  })
Product.belongsTo(User)



User.hasMany(Order, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
Order.belongsTo(User)

Product.belongsToMany(Cart, { through: 'CartsProducts' , uniqueKey: 'key' });
Cart.belongsToMany(Product, { through: 'CartsProducts' , uniqueKey: 'key' });

Product.belongsToMany(Order, { through: 'ProductsOrders' , uniqueKey: 'key' });
Order.belongsToMany(Product, { through: 'ProductsOrders' , uniqueKey: 'key' });

const syncAllModels = () =>{
  sequelizeinstance.sync({ force: true });
}

if (require.main === module) {
  syncAllModels();
}

module.exports = syncAllModels