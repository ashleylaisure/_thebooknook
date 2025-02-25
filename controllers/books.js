// =================================  DEPENDENCIES  ==========================
const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

// =================================  INDUCES ROUTES  ==========================
// ==============================  /users/:userId/books  ==========================

// ===== I. INDEX =====
router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('books/index.ejs', {
            books: currentUser.books,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});

// ===== N. NEW =======
router.get('/new', (req, res) => {
    res.render('books/new.ejs');
});

// ===== D. DELETE ====
router.delete('/:bookId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.books.id(req.params.bookId).deleteOne();
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/books`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
// ===== U. UPDATE ====
router.put('/:bookId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const foundBook = currentUser.books.id(req.params.bookId);

        foundBook.set(req.body);
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/books/${req.params.bookId}`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// ===== C. CREATE ====
router.post('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.books.push(req.body);
        await currentUser.save();

        res.redirect(`/users/${currentUser._id}/books`)
    } catch (error) {
        console.log(error);
        res.redirect('/')
    }
});
// ===== E. EDIT ======
router.get('/:bookId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const foundBook = currentUser.books.id(req.params.bookId);

        res.render('books/edit.ejs', { book: foundBook });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});
// ===== S. SHOW ======
router.get('/:bookId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const foundBook = currentUser.books.id(req.params.bookId);
        res.render('books/show.ejs', { book: foundBook });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// =================================  ROUTER  ==========================
module.exports = router;