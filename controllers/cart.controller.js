const cartmodel = require('../models/cart.model')
const validationResult = require('express-validator').validationResult
let table =[]

exports.getCart = (req,res,next) => {
    cartmodel.getItemsByUser(req.session.userId).then( (item) => {
        res.render('cart',{
            items : item,
            isUser : true,
            validationerrors : req.flash('validationerrors')[0],
            isAdmin : req.session.isAdmin
        })
    }).catch( err => console.log(err))
}

exports.postCart = (req,res,next) => {
    if (validationResult(req).isEmpty()) {
            cartmodel.addNewItem({
                name : req.body.name,
                price : req.body.price,
                amount : req.body.amount,
                productId : req.body.productId,
                userId : req.session.userId,
                timestamp : Date.now()
            }).then(() => {
                table.push(req.body.name)
                res.redirect('/cart')
            }).catch(err => {
                console.log(err)
            })
        } else {
            req.flash('validationerrors',validationResult(req).array())
            res.redirect(req.body.redirectTo)
        }
    
}

exports.postSave = (req,res,next) => {
    if (validationResult(req).isEmpty()) {
        cartmodel.editItem(req.body.cartId,{ amount : req.body.amount, timestamp : Date.now()}).then(() => {
            res.redirect('/cart')
        }).catch( err => console.log(err))
    } else {
        req.flash('validationerrors',validationResult(req).array())
        res.redirect('/cart')
    }
}

exports.postDelete = (req,res,next) => {
    cartmodel.deleteItem(req.body.cartId).then(() => 
        res.redirect('/cart')
    ).catch(err => console.log(err))
}

exports.postDeleteAll = (req,res,next) => {
    cartmodel.deleteAllItem().then(() => 
        res.redirect('/cart')
    ).catch( err => console.log(err))
}