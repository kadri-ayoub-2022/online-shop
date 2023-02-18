const mongoose = require('mongoose')


const DB_URL = 'mongodb://127.0.0.1:27017/online-shop'

const Cartshema = mongoose.Schema({
    name : String,
    price : Number,
    amount : Number,
    userId : String,
    productId : String,
    timestamp : Number
})

const CartItem = mongoose.model('cart',Cartshema)

exports.addNewItem = (data) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(DB_URL).then(() => {
            let item = new CartItem(data)
            return item.save()
        }).then (() => {
            mongoose.disconnect()
            resolve()
        }).catch( err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.getItemsByUser = userid => {
    return new Promise((resolve,reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.find({userId : userid},{},{sort : { timestamp : 1}})
        }).then( item => {
            mongoose.disconnect()
            resolve(item)
        }).catch( err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.editItem = (id,newdata) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(DB_URL).then(() => {
            return CartItem.updateOne({_id : id}, newdata)
        }).then((items) => {
            mongoose.disconnect()
            resolve(items)
        }).catch(err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.deleteItem = id => {
    return new Promise((resolve,reject) => {
        mongoose.connect(DB_URL).then(
                () => CartItem.findByIdAndDelete(id)
            ).then( () => {
                mongoose.disconnect()
                resolve()
            }).catch( err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}


exports.deleteAllItem = () => {
    return new Promise((resolve,reject) => {
        mongoose.connect(DB_URL).then(
                () => CartItem.deleteMany({})
            ).then( () => {
                mongoose.disconnect()
                resolve()
            }).catch( err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}

