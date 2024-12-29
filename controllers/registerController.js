module.exports = (req, res) => {
     let name = "";
     let password = "";
     let data = req.flash('data')[0];

     if (typeof data != "undefined"){
         name = data.name;
         password = data.password;
     }

    res.render('register',{
        errors: req.flash('validationErrors'),
        name: name,
        password: password
    });
};