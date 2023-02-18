const mongoose = require('mongoose')

const bcrypt = require('bcrypt')

const db_url = 'mongodb://127.0.0.1:27017/online-shop'
const userschema = mongoose.Schema({
    username : String,
    email : String,
    password : String,
    isAdmin : {
        type : Boolean,
        default : false
    }
})

const User = mongoose.model('user',userschema)

exports.createNewUser = (username,email,password) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(db_url).then(() => {
            let expreg =/@esi-sba.dz\b/
            if (expreg.test(email)) {
                return User.findOne({email : email})
            } else {
                mongoose.disconnect()
                reject('email must be of the school')
            }
        }).then((user) => {
            if (user) {
                mongoose.disconnect()
                reject('email is used')
            }else {
                return bcrypt.hash(password,10)
            }
        }).then(hashedpassword => {
                let expreg1 = /ay.kadri@esi-sba.dz/
                if (expreg1.test(email)){
                    let user =new User({
                        username : username,
                        email : email,
                        password : hashedpassword,
                        isAdmin : true
                    })
                    return user.save()
                } else {
                    let user =new User({
                        username : username,
                        email : email,
                        password : hashedpassword
                    })
                    return user.save()
                }
            }
        ).then(() => {
            mongoose.disconnect()
            resolve()
        }).catch( err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}

exports.login = (email,password) => {
    return new Promise((resolve,reject) => {
        mongoose.connect(db_url).then(() => User.findOne({email:email})).then((user) => {
            if (!user){
                mongoose.disconnect()
                reject('there is no user match emails')
            }else {
                return bcrypt.compare(password,user.password).then((same) => {
                    if(!same) {
                        mongoose.disconnect()
                        reject('password is incorrect')
                    }else {
                        mongoose.disconnect()
                        resolve({
                            id : user._id,
                            isAdmin : user.isAdmin
                        })
                    }
                })
            }
        }).catch( err => {
            mongoose.disconnect()
            reject(err)
        })
    })
}
