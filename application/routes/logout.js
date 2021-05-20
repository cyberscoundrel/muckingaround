var express = require('express');
var router = express.Router();
var db = require('../config/database');
var bcrypt = require('bcrypt');
//var usererror = require('../helpers/error/usererror');
const UserError = require('../helpers/error/usererror');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');

router.get('/', (req, res, next) => {
    if(req.session)
    {
        console.log("we got one");
        req.session.destroy((err) => {
            if(err)
            {
                errorPrint('session could not be destroyed');
                //req.flash('error', 'could not end session');
                next(err);
            }
            else
            {
                successPrint("session destroyed");
                //req.flash('success','logout');

                //res.render('partials/login',{script: 'login.js'});
                res.redirect('/login');
                //req.flash('success', 'logout');
                //res.clearCookie('csid');
                //res.render('/partials/login', {script: '/login.js'});
                //res.clearCookie('csid');
                //res.json({status: 'ok', message: "user logged out"});
                //req.flash('success', 'logged out');
                //res.render('/partials/login', {script: '/login.js'});
                //console.log("redirect");
                //res.redirect('/login');
            }
        })
        //res.clearCookie('csid');
                //res.json({status: 'ok', message: "user logged out"});
        //req.flash('success', 'logged out');
        //res.redirect('/login');
        //res.render('/partials/login', {script: '/login.js'});
    }

})


module.exports = router;