const express = require('express')
const Product = require('../../models/products')
const Cart = require('../../models/cart')
const app = express()


exports.home = app.get('/home', (req, res, next) =>{
    res.render('home', {})
})

exports.productList = app.get('/product-list', (req, res, next) =>{
    Product.findAll().then((allProducts)=>{
        console.log('Products:', allProducts)
        res.render('productsList', {allProdcuts: allProducts,
                                    admin: false})}) 
    .catch( error =>{
        console.log('ProductList error:', error)
    })
})

exports.productsAdmin = app.get('/products-admin', (req, res, next) =>{
    Product.findAll().then((allProducts)=>{
        res.render('productsList', {allProdcuts: allProducts,
                                    admin: true})}) 
    .catch( error =>{
        console.log('Product Admin error:', error)
    })
})

exports.productsAdmin = app.get('/products-admin/:productID', (req, res, next) =>{
    
    let productID = req.params.productID
  
    Product_ = Product.findAll({where: {
        id: productID
    }})
    .then((allProducts)=>{
        console.log('products:', allProducts)
        let productDetails = {
                title: allProducts[0].title,
                ImageUrl: allProducts[0].imageURL,
                price: allProducts[0].price,
                key: allProducts[0].id
        }

        res.render('addProduct', {productDetails: productDetails,
                                    admin: true})})
    .catch( error => {
        console.log('product not found: ' , error)
    })                                    
})

exports.productDelete = app.get('/products-admin/delete/:productID', (req, res, next) =>{
    
    let productID = req.params.productID

    Product.destroy({
        where: {
            id: productID
        }
    })
    .then(() => res.redirect('/product-list'))
    .catch(error => {
        console.log('product not found for delete: ' , error)
    })
})
exports.productsAdmin = app.post('/products-admin', (req, res, next) =>{
    
    let productID = req.body.key

    Product.update({
        title: req.body.title,
        imageURL: req.body.imageURL,
        price: req.body.price
    }, {
        where:{
            id: productID
        }
    })
    .then( () => res.redirect('/products-admin'))
    .catch(error => {
        console.log('product not found for update: ' , error)
    })
    
})
exports.addProduct = app.get('/add-product', (req, res, next) =>{
    res.render('addProduct', {productDetails: {},
                              admin: false})
})

exports.addProduct = app.post('/add-product', (req, res, next) =>{
    let Product_ = Product.create({title: req.body.title,
                            description: req.body.description,
                            imageURL: req.body.imageURL, 
                            price: req.body.price}).then(() =>{
                                console.log('body:', req.body)
                                res.redirect('/home')
                            }).catch((error) =>{
                                console.log('req.body.description: -- ',req.body.title)
                                console.log(error)
                            })

})

exports.addtoCart = app.get('/product/:productKey', (req, res, next) =>{
    productKey = req.params.productKey
 
    Product_ = new Product()

    Product_.allProducts((allProducts) =>{
        allProducts.forEach(element => {
            if(element.key == productKey)
                {
                    let myCart = new Cart
                    myCart.addToCart(element)
                }
            else
                console.log("product not found")
        });
        res.redirect('/home') 
    })
})

exports.viewCart = app.get('/view-cart', (req, res, next) => {
    let myCartInstance = new Cart

    myCartInstance.currentCartItems((productsInCart) =>{
        res.render('cart', {allCartProducts: productsInCart})
    })
})

exports.removeFromCart = app.get('/view-cart/:productKey', (req, res, next) => {
    let myCartInstance = new Cart
    productKey = req.params.productKey
    
    myCartInstance.removeFromCart(productKey)

    res.redirect('/view-cart')
}) 