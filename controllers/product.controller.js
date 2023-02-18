const productsmodel = require('../models/products.model')

exports.getProduct = (req,res,next) => {
    productsmodel.getFirstProduct().then((product) => {
        res.render('product', {
            products : product,
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin
        })
    })
}

exports.getProductById = (req,res,next) => {
    let id = req.params.id
    productsmodel.getProductById(id).then((product) => {
        res.render('product', {
            products : product,
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin
        })
    })
}

exports.deleteproductbyid = (req,res,next) => {
    let id = req.body.productId
    productsmodel.DeleteProduct(id).then(() => {
        res.redirect('/')
    }).catch(err => console.log(err))
}
