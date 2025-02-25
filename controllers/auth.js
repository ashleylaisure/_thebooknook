// =================================  DEPENDENCIES  ==========================
const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');

const User = require('../models/user.js');

// =================================  ROUTES  /auth ==========================

// ===== SIGN UP =====
// router.get('/sign-up', (req, res) => {
//     res.render('auth/sign-up.ejs');
// });

// ===== SIGN IN =====
// router.get('/sign-in', (req, res) => {
//     res.render('auth/sign-in.ejs');
// });

// ===== SIGN OUT =====
router.get('/sign-out', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    });
});
// =================================  SIGN UP POST REQUEST ==========================
router.post('/sign-up', async (req, res) => {
    try {
        // enforcing unique usernames
        const userInDatabase = await User.findOne({ username: req.body.username });
        const useremailDatabase = await User.findOne({ email: req. body.email })
        if (userInDatabase) {
            req.flash('message', 'Username already taken.');
            // return res.send('Username already taken.');
            return res.redirect('/');
    }

    // Check if email has already been used
    if (useremailDatabase) {
        req.flash('message', 'Email already taken.');
        // return res.send('Email already taken.');
        return res.redirect('/');
    }

    // checking password & confrimPassword match 
    if (req.body.password !== req.body.confirmPassword) {
        req.flash('message', 'Password and Confirm Password must match');
        // return res.send('Password and Confirm Password must match');
        return res.redirect('/');
    }

    // securely storing passwords
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    // create user
    await User.create(req.body);
    res.redirect('/');

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});



// ===== SIGN IN POST REQUEST=====
router.post('/sign-in', async (req, res) => {
    try {
        // Confirming a user exists
        const userInDatabase = await User.findOne({ username: req.body.username });
        if (!userInDatabase) {
        req.flash('message', 'Login failed. Username not recognized.');
        // return res.send('Login failed. Please try again.');
        return res.redirect('/');
    }

    // Bcrypt's comparison function
    const validPassword = bcrypt.compareSync(
        req.body.password,
        userInDatabase.password
    );

    if (!validPassword) {
        req.flash('message', 'Password does not match. Please try again');
        // return res.send('Login failed. Please try again.');
        return res.redirect('/');
    }

    // creating a session for a signed-in user
    req.session.user = {
        username: userInDatabase.username,
        _id: userInDatabase._id
    };

    req.session.save(() => {
        res.redirect('/')
    })

    // res.redirect('/');

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// =================================  ROUTER  ==========================
module.exports = router;