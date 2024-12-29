const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Provide a username']
    },
    password: {
        type: String,
        required: [true, 'Provide a password']
    }
});

userSchema.pre('save', function(next) {
    const user = this;
    bcrypt.hash(user.password, 10,).then((hash) => {
        user.password = hash;
        next();
    }).catch((err) => {
        console.error(err);
    });
});

const User = mongoose.model('User', userSchema);
module.exports = User;