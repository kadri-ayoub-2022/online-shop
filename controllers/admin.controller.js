const productsmodel = require('../models/products.model')
const validationResult = require('express-validator').validationResult

exports.getAdd = (req,res,next) => {
    res.render('add-product',{
        validationErrors : req.flash('validationErrors'),
        isUser : true,
        isAdmin : true
    })
}

exports.postAdd = (req,res,next) => {
    if (validationResult(req).isEmpty()) {
        console.log(req.body)
        console.log(req.file)
        console.log(validationResult(req).array())
        productsmodel.AddNewProduct(req.body.name,req.body.price,req.body.description,req.body.category,req.file.filename)
        res.redirect('/')
    }else {
        req.flash('validationErrors', validationResult(req).array())
        res.redirect('/admin/add')
    }
}