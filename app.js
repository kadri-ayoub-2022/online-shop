const express = require('express');
const path = require('path');
const session = require('express-session');
const SessionStore =  require('connect-mongodb-session')(session);
const flash = require('connect-flash')

const homeroute = require('./routes/home.route');
const productrouter = require('./routes/product.route');
const authrouter = require('./routes/auth.route');
const cartRouter = require('./routes/cart.route')
const adminrouter = require('./routes/admin.route')
const { Collection } = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname,'assets')));
app.use(express.static(path.join(__dirname,'images')));
app.use(flash())

const STORE = new SessionStore({
    uri: 'mongodb://127.0.0.1:27017/online-shop',// link de db
    collection : 'session' //name of collection
});

app.use(session({
    secret : ' write anything',// the text use it in the bcrypt
    saveUninitialized: false,// if i would to save the session in db after deleting
    store : STORE// the path of saving
}));


app.set('view engine', 'ejs');
app.set('views','views');

app.use(homeroute);
app.use('/',authrouter);
app.use('/product',productrouter);
app.use('/cart',cartRouter)
app.use('/admin',adminrouter)
const port = process.env.PORT || 3000;

app.listen(port, () => console.log('server listen on port 3000'));
//YmyAAhn0u8Univi0