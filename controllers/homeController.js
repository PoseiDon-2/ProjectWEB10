const User = require('../models/user');

module.exports = async (req, res) => {

    let UserData = await User.findById(req.session.userId);
    res.render('home',{
        UserData
    }); 
}