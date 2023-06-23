const mongoose = require('mongoose')

const blogsSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

    Filepath: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('schemadata', blogsSchema);