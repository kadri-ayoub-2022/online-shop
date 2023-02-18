const router = require('express').Router()
const bodyparser = require('body-parser')
const check = require('express-validator').check

const authGaurd = require('./guards/auth.guard')

const cartController = require('../controllers/cart.controller')
const { route } = require('./home.route')

router.get('/', authGaurd.isauth,bodyparser.urlencoded({ extended: true }),cartController.getCart)



router.post(
    '/',authGaurd.isauth,bodyparser.urlencoded({ extended: true }),
    check('amount').not().isEmpty().withMessage('amount is required').isInt({min : 1}).withMessage('amount must be greater then 0'),
    cartController.postCart
)

router.post('/save', authGaurd.isauth,bodyparser.urlencoded({ extended: true }),
    check('amount').not().isEmpty().withMessage('amount is required').isInt({min : 1}).withMessage('amount must be greater than 0'),
    cartController.postSave
)
router.post('/delete', authGaurd.isauth,bodyparser.urlencoded({ extended: true }),cartController.postDelete)

router.post('/deleteall', authGaurd.isauth,bodyparser.urlencoded({ extended: true }),cartController.postDeleteAll)


module.exports = router