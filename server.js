// =================================  DEPENDENCIES  ==========================
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const path = require('path')

// managing sessions
const session = require('express-session');
const flash = require('connect-flash');

const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');

const MongoStore = require("connect-mongo")

// DECLARE PORT VARIABLE
const port = process.env.PORT ? process.env.PORT : '3000';

// IMPORT ROUTER TO CONTROLLERS
const authController = require('./controllers/auth.js');
const booksController = require('./controllers/books.js');


// =================================  MIDDLEWARE  ==========================
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        }),
    })
);

app.use(flash());

// =================================  ROUTES  ==========================
app.get('/', async (req, res) => {
    if (req.session.user) {
    res.redirect(`/users/${req.session.user._id}/books`);
    } else {
        res.render('home.ejs', {
            user: req.session.user,
            message : req.flash('message'),
        });
    }
}); 

// =================================  ROUTE CONTROLLERS  ==========================
app.use(passUserToView);
app.use('/auth', authController);
app.use(isSignedIn);
app.use('/users/:userId/books', booksController);

// =================================  PORT  ==========================
app.listen(port, () => {
    console.log(`The express app is ready on port ${port}!`);
});
