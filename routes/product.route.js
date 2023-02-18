const router = require('express').Router()
const bodyparser = require('body-parser')

const check = require('express-validator').check

const productController = require('../controllers/product.controller')
const authguard = require('./guards/auth.guard')
const adminguard = require('./guards/admin.guard')

router.get('/',authguard.isauth,check('amount').not().isEmpty().withMessage('amount is required').isInt({min : 1}).withMessage('amount must be greater then 0'),productController.getProduct)

router.get('/:id',authguard.isauth,check('amount').not().isEmpty().withMessage('amount is required').isInt({min : 1}).withMessage('amount must be  greater then 0'),productController.getProductById)

router.post('/delete', adminguard,bodyparser.urlencoded({ extended: true }),productController.deleteproductbyid)


module.exports = router