const express = require('express')
const ejsMate = require('ejs-mate')
const path = require('path');
const methodOverride = require('method-override');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const mongoose = require('mongoose')
const port = 3000;
const session = require('express-session')
const { isLoggedIn, format } = require('./middleware')

const User = require('./models/user')
mongoose.connect('mongodb://127.0.0.1:27017/passportTest')

const app = express();

app.set('view engine', 'ejs');
app.engine('ejs', ejsMate);

app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname))
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false//,
    // cookie: { secure: true }
}))

app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(port)

module.exports.passport = passport
module.exports.app = app