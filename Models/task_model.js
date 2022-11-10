const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    task: String,
    date: Date,
    priority: Boolean,
    user_id: String
})

module.exports = mongoose.model('task-list', schema);