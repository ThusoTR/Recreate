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

Product.belongsToMany(Cart, { through: 'CartsProducts' });
Cart.belongsToMany(Product, { through: 'CartsProducts' });

Product.belongsToMany(Order, { through: 'ProductsOrders' });
Order.belongsToMany(Product, { through: 'ProductsOrders' });

const syncAllModels = () =>{
  sequelizeinstance.sync({ force: true });
}

if (require.main === module) {
  syncAllModels();
}

module.exports = syncAllModels