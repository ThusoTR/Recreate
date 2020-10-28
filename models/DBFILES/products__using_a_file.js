const { json } = require("body-parser");
const fs = require('fs')
const path = require('path');
const { productList } = require("../controller/routes/routes_controller");

let myPath = path.dirname('products.json')

class Product{
    constructor(title, url_link, price){
        this.productData = {
            "title": title,
            "url_link": url_link,
            "price": price
        }
        this.productData.key = Math.random()
    }
    filePath = __dirname + '/products.json'

    save = () =>{

      let productListData = this.productData

      this.allProducts( (currentFileContent) =>{
        let writeContent = currentFileContent

        if(writeContent.length === 0)
          writeContent[0] = productListData
        else
          writeContent[writeContent.length ] = productListData
  
          fs.writeFile(this.filePath, JSON.stringify(writeContent), err => {
              if (err) {
                console.error(err)
                return
              }
            })
      })
      
    }

    allProducts = (cb) =>{
        fs.readFile(this.filePath, 'utf8' , (err, data) => {
            if (err) {
              console.error(err)
              cb([])
              return []
            }
            
            let allProductsData = JSON.parse(data)
            cb( allProductsData)
            return allProductsData
          })
    }

    editProduct = (productKey, newProductData) =>{

      this.allProducts((allProductsList) =>{
        let newProductsList = allProductsList.map((productItem) =>{
          if (productItem.key== productKey){
            productItem.title = newProductData.title
            productItem.url_link = newProductData.url_link
            productItem.price = newProductData.price

            console.log('found', productItem)
          }

          return productItem
        })

      fs.writeFile(this.filePath, JSON.stringify(newProductsList), err => {
          if (err) {
            console.error(err)
            return
          }
        })
      })
    }

    deleteProduct = (productkey) =>{
      this.allProducts((allProductsList) =>{
        allProductsList.forEach((element, index) => {
          
          if(element.key == productkey){
            allProductsList.splice(index, 1)
            console.log('delete index',  index)

            fs.writeFile(this.filePath, JSON.stringify(allProductsList), err => {
              if (err) {
                console.error(err)
                return
              }
            })
          }
        });
      })


    }
}

module.exports = Product