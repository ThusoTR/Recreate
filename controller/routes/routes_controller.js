const express = require('express')
const Product = require('../../models/products')
const Cart = require('../../models/cart')

const assosciations = require('../../models/databaseAdmin') //allows for model assosciation to be visible in this file

const app = express()


exports.home = app.get('/home', (req, res, next) =>{
    res.render('home', {})
})

exports.productList = app.get('/product-list', (req, res, next) =>{
    Product.findAll().then((allProducts)=>{
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

exports.productsAdmin = app.get('/products-admin/:id', (req, res, next) =>{
    
    let productID = req.params.id
    
    Product.findAll({where: {
        id: productID
    }})
    .then((allProducts)=>{
        console.log('productID:', req.params)

        console.log('products:', allProducts)
        let productDetails = {
                title: allProducts[0].title,
                ImageUrl: allProducts[0].imageURL,
                price: allProducts[0].price,
                key: allProducts[0].id
        }

        res.render('addProduct', {productDetails: productDetails,
                                    admin: true})
    })
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
    console.log(req.User.id)
    res.render('addProduct', {productDetails: {},
                              admin: false})
})

exports.addProduct = app.post('/add-product', (req, res, next) =>{
    let userIdNumber = 1

    Product.create({
        title: req.body.title,
        description: req.body.description,
        imageURL: req.body.imageURL, 
        price: req.body.price,
        UserId: req.User.id,
        })
        .then(() =>{
        res.redirect('/product-list')
        })
        .catch((error) =>{
        console.log(error)
        })

})

exports.addtoCart = app.get('/product/:productKey', (req, res, next) =>{
    productKey = req.params.productKey

    let currentUser = req.User

    console.log('user:', currentUser.firstName)
    
    let cartForUser = currentUser.getCart()
    .then(userCart =>{
        
        Product.findByPk(productKey)
        .then(productToAdd =>{
            userCart.addProduct(productToAdd, {
                though:{
                UserId: req.User.id
            }})
        }).catch(()=>{
            console.log('product not added')
        })
        
    res.redirect('/view-cart') 
    })
})

exports.viewCart = app.get('/view-cart', (req, res, next) => {
    let currentUser = req.User
    let userCart = currentUser.getCart()
    .then( userCart => {
        userCart.getProducts({
            where:{
            UserId: req.User.id
        }})
        .then(productsInCart =>{
            res.render('cart', {allCartProducts: productsInCart})
        })
    })
})

exports.removeFromCart = app.get('/view-cart/:productKey', (req, res, next) => {

    let productKey = req.params.productKey
    
    let currentUser = req.User
    let userCart = currentUser.getCart()
    .then( userCart => {
        return userCart.getProducts( {
            where:{
                id: productKey,
        }})
        .then(productToDelete =>{
            console.log("productToDelete: ", productToDelete)
            userCart.removeProduct(productToDelete, {
                where:{
                    id: productKey,
            }})        
            .then(() => res.redirect('/view-cart'))
            .catch(error =>{
                console.log(error)
            })
        })

        
    }).catch( error => {
        console.log(' No cart found?: ',error)
    })
}) 