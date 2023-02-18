 const mongoose = require('mongoose')
mongoose.set('strictQuery', true)


const db_url = 'mongodb://127.0.0.1:27017/online-shop'

const productshema = mongoose.Schema({
    category : String,
    description : String,
    image : String,
    name : String,
    price : Number

})

const Product = mongoose.model('product',productshema)

exports.getALLProducts = () => {
    return new Promise((resolve,reject) => {
        mongoose.connect(db_url).then(() => {
            return Product.find({})
        }).then((products) => {
            mongoose.disconnect()
            resolve(products)
        }).catch( (err) => reject(err))
    }) 
}

exports.getProductsByCategory = (category) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(db_url).then(() => {
            return Product.find({category : category})
        }).then((products) => {
            mongoose.disconnect
            resolve(products)
        }).catch((err) => { reject(err)})
    })
}

exports.getProductById = (id) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(db_url).then(() => {
            return Product.findById(id);
        }).then( (product) => {
            mongoose.disconnect()
            resolve(product)
        }).catch((err) => reject(err));
    })
}

exports.getFirstProduct = () => {
    return new Promise((resolve,reject) => {
        mongoose.connect(db_url).then(() => {
            return Product.findOne({});
        }).then( (product) => {
            mongoose.disconnect()
            resolve(product)
        }).catch((err) => reject(err));
    })
}

exports.AddNewProduct = (name,price,description,category,image) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(db_url).then(() => {
            return Product.findOne({
                name : name,
                price : price,
                description : description,
                category : category,
                image : image
            }) 
        }).then( (product) => {
            if (product) {
                mongoose.disconnect()
                reject('product exist yet')
            }else {
                let prod = new Product({
                    name : name,
                    price : price,
                    description : description,
                    category : category,
                    image : image
                })
                return prod.save()
            }
        }).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch( err => {
            reject(err)
        })
    })
}

exports.DeleteProduct = (productid) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(db_url).then(
                () => Product.findByIdAndDelete(productid)
            ).then( () => {
                mongoose.disconnect()
                resolve()
            }).catch( err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}