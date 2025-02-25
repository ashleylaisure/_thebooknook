const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    series: {
        type: String,
        required: false,
    },

    numSeries: {
        type: Number,
        required: false,
    },

    author: {
        type: String,
        required: false,
    },

    status: {
        type: String,
        enum: ['tbr', 'reading', 'read', 'paused', 'dnf'],
    },

    started: {
        type: Date,
        required: false,
    },

    finished: {
        type: Date,
        required: false,
    },

    rating: {
        type: String,
        enum: ['0', '1', '2', '3', '4', '5'],
    },

    spiceRating: {
        type: String,
        enum: ['0', '1', '2', '3', '4', '5'],
    },

    format: {
        type: String,
        enum: ['Audiobook', 'Ebook', 'Hardcover', 'Paperback'],
    },

    genre: {
        type: String,
        enum: ['Biography', 'Classic', 'Contemporary Fiction', 'Dark Academia', 
        'Fantasy', 'Historical Fiction', 'History', 'Horror', 'Literary Fiction', 
        'Memoir', 'Mystery', 'Nonfiction', 'Play', 'Poetry', 'Retelling',
        'Romance', 'Romantasy', 'Science Fiction','Thriller', 'Young Adult',
        ]
    },

    review: {
        type: String,
    },

    photo: {
        type: String,
    },
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    
    books : [bookSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;