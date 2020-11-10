const express = require('express')

const app = express()

const routes = require('./controller/routes/routes_controller')

const User = require('./models/user')
const Cart = require('./models/cart')
const dummymodels = require('./models/dummyModels')



app.use(express.static('public'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next)=>{
    User.findByPk(1)
    .then(UserObj =>{
        req.User = UserObj
        //console.log('Request:',  req.User)
        next()
    })
    .catch(error =>{
        console.log('middleware: ', error)
    })

    
})
app.use(routes.home) 
app.use(routes.productList)
app.use(routes.productsAdmin)
app.use(routes.productDelete)
app.use(routes.addtoCart)
app.use(routes.viewCart)
app.use(routes.removeFromCart)
app.use(routes.addProduct)


app.listen(8000)