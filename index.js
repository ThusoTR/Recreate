const express = require('express')

const app = express()

const routes = require('./controller/routes/routes_controller')
app.use(express.static('public'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.use(routes.home)
app.use(routes.productList)
app.use(routes.productsAdmin)
app.use(routes.productDelete)
app.use(routes.addtoCart)
app.use(routes.viewCart)
app.use(routes.addProduct)


app.listen(8000)