const router = require('express').Router()
const check = require('express-validator').check
const multer = require('multer')


const admincontroller = require('../controllers/admin.controller')
const adminGuard = require('./guards/admin.guard')

router.get('/add',adminGuard,admincontroller.getAdd)

router.post(
    '/add', 
    multer({
        storage: multer.diskStorage({
            destination : (req,file,cb) => {
                cb(null,'images')
            },
            filename : (req,file,cb) => {
                cb(null,Date.now()+'-'+ file.originalname)
            }
        })
    }).single('image'),check('name').not().isEmpty().withMessage('no valid name'),
    check('price').not().isEmpty().withMessage('no valid price').isLength({min : 0}).withMessage(' price must be greater than 0'),
    check('category').not().isEmpty(),
    check('image').custom((value,{req}) => {
        if (req.file) return true
        else throw 'image is required'
    }),
    admincontroller.postAdd)

module.exports = router
//<option value="" selected>choose a category</option>