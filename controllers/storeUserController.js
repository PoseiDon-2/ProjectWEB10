const User = require('../models/user');

module.exports = (req, res) => {
    User.create(req.body).then(() => {
        console.log('User registered successfully'); 
        res.redirect('/');
    }).catch((err) => {
        // console.log(err.message);
        if (err){
            const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
            req.flash('validationErrors', validationErrors);
            req.flash('data', req.body);
            return res.redirect('/register');
        }
    }); 
}