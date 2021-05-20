var express = require('express');
var random = require('random');
var db = require('../config/database');
var router = express.Router();
var bcrypt = require('bcrypt');
const UserError = require('../helpers/error/usererror');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var UserModel = require('../models/user');

router.get('/', (req, res, next) => {
    if(req.session && req.session.username)
    {
        errorPrint("already logged");
        res.redirect('/');
    }
    res.render('partials/registration', {script: 'registration.js'});
    console.log("register");
});

router.post('/', (req, res, next) => {
    console.log("post");
    console.log(req.body);
    let username = db.escape(req.body.uname);
    let email = db.escape(req.body.email);
    let password = db.escape(req.body.pswd);
    console.log(username);
    console.log(password);

    UserModel.usernameExists(username)
    .then((userDoesNameExist) => {
        if(userDoesNameExist)
        {
            throw new UserError('username exists','/register',200);

        }
        else
        {
            return UserModel.emailExists(email);
        }
    })
    .then((emailDoesExist) => {
        if(emailDoesExist)
        {
            throw new UserError('email exists', '/register', 200);

        }
        else
        {
            return UserModel.create(username,password,email);
        }
    })
    .then((createdUserId) => {
        if(createdUserId < 0)
        {
            throw new UserError('server error', '/register',500);
        }
        else
        {
            successPrint('user created');
            req.flash('success','user created');
            res.redirect('/login');
        }
    })
    .catch((err) => {
        if(err instanceof UserError)
        {
            errorPrint(err.getmessage());
            res.status(err.getStatus());
            req.flash('error',err.getmessage());
            res.redirect(err.getRedirectURL());



        }
        else
        {
            next(err);
        }
    })


    /*bcrypt.hash(password, 10, ([err, result]) => {
        password = result;
    })*/
    /*db.execute("SELECT * FROM `termproject`.`users` WHERE username=? OR email=?",[username, email])
    .then(([results, fields]) => {
        console.log("here");
        if(results && results.length > 0)
        {
            console.log("fail lol");
            if(results[0].username === username)
            {
                throw new UserError('username already exists', '/register', 200);
            }
            else if(results[0].email === email)
            {
                throw new UserError('email already exists', '/register', 200);
            }
        }
        else
        {
            console.log("epic");
            return bcrypt.hash(password, 10);
            //return db.execute("INSERT INTO `termproject`.`users` ('username`,`password`,`email`) VALUES (?,?,?);", [username, password, email]);
        }
    }).then((hashedpassword) => {
        console.log("now here");
        console.log(hashedpassword);
        return db.execute("INSERT INTO `termproject`.`users` (`idusers`,`username`,`password`,`email`) VALUES (UUID(),?,?,?)", [username, hashedpassword, email]).catch((err) => {
            console.log("an error");
            console.log(err);
        });
        /*if(results && results.affectedRows)
        {
            successPrint("user was created");
            res.redirect('/login');
        }
        else
        {
            throw new UserError('user could not be created', '/register', 500);
        }*/
    /*})
    .then(([results, fields]) => {
        console.log("now here");
        if(results && results.affectedRows)
        {
            console.log("and here");
            //successPrint("user was created");
            res.redirect('/login');
        }
        else
        {
            throw new UserError('user could not be created', '/register', 500);
        }
    })
    .catch((err) => {
        console.log("idiot");
        errorPrint('user could not be made', err);
        if(err instanceof UserError)
        {
            errorPrint(err.getmessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        }
        else
        {
            next(err);
        }
    })*/

});

//router.get('')

module.exports = router;

