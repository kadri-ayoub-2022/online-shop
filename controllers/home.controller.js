const productsModel = require('../models/products.model')

exports.getHome = (req,res,next) => {
    let category = req.query.category
    let validCategories = ['phones','computers','television']
    let ProductsPromise 
    if (category && validCategories.includes(category)) {ProductsPromise = productsModel.getProductsByCategory(category)} 
    else{ProductsPromise = productsModel.getALLProducts()} 
    ProductsPromise.then(products => {
        res.render('index',{
            products : products,
            isUser : req.session.userId,
            isAdmin : req.session.isAdmin,
            validationerrors : req.flash('validationerrors')[0]
        })
    })
}



