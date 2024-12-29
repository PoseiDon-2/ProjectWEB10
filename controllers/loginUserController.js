const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = (req, res) => {
    const { name, password } = req.body;

    User.findOne({ name: name }).then((user) => {
        console.log(user);

        if (user) {
            let cmp = bcrypt.compare(password, user.password).then((match) =>{
                if(match){
                    req.session.userId = user._id;
                    res.redirect('/home');
                }else{
                    res.redirect('/login');
                }
            });
        }else{
            return res.redirect('/login');
        }
    });
}