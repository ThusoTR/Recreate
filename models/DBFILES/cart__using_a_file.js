const { json } = require("body-parser");
const fs = require('fs')
const path = require('path');
const { productList } = require("../controller/routes/routes_controller")

class Cart{
    filePath = __dirname + '/cart.json'
    addToCart = (productDetails) =>{
        
        this.currentCartItems((currentCart) =>{
            console.log('conents: ', currentCart)
            let foundInCart = false
            if (currentCart.length != 0){
                let modifyCart = []
                modifyCart = currentCart.map((element) => {
                    if(element.key == productDetails.key)
                        {
                           foundInCart = true
                           element.quantity = parseInt(element.quantity) + 1
                        }
                    return element
                });

                if (!foundInCart){
                    productDetails.quantity = 1
                    modifyCart.push(productDetails)
                    currentCart = modifyCart
                }
                console.log('modified cart: ', modifyCart)
            }

            else{
                productDetails.quantity = 1
                currentCart.push(productDetails)
            }

            fs.writeFile(this.filePath, JSON.stringify(currentCart), (err) =>{
                if (err) {
                    console.error(err)
                    return
                  }
            })
        })

 
    }

    removeFromCart = (productKey) =>{
        this.currentCartItems((allCartItems) =>{
            allCartItems.forEach((element, index) => {
                if (element.key == productKey){
                    allCartItems.splice(index, 1)
                    console.log('delete cart index',  index)
        
                    fs.writeFile(this.filePath, JSON.stringify(allCartItems), err => {
                      if (err) {
                        console.error(err)
                        return
                      }
                    })
                }
            });
        })
    }

    currentCartItems = (cb) =>{
        fs.readFile(this.filePath, 'utf8' , (err, data) => {
            if (err) {
              console.error(err)
              cb([])
              return []
            }
            console.log("should be zero = ", data.length)
            if(data.length != 0)
                {
                    let allProductsData = JSON.parse(data)
                    return cb( allProductsData)
                }
            else
                return cb([])
          })    
        }
}

module.exports = Cart