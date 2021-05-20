var express = require('express');
var router = express.Router();
var db = require('../config/database');
var bcrypt = require('bcrypt');
//var usererror = require('../helpers/error/usererror');
const UserError = require('../helpers/error/usererror');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');



router.get('/', (req, res, next) => {
    if(req.session && req.session.username)
    {
        errorPrint("already logged");
        res.redirect('/');
    }
    res.render('partials/login', {script: '/login.js'});
    console.log("login");
});

router.post('/', (req, res, next) => {
    //console.log(req.body);
    console.log(req.body.username);
    console.log(req.body.password);
    var username = db.escape(req.body.username);
    var password = db.escape(req.body.password);
    let userid = "";
    //var dbpromise = db.promise();
    //var resultpswd = '';
    //console.log(dbpromise);
    //dbpromise.query("SELECT 1").then(() => console.log("help"));
    db.query("SELECT idusers,username,password FROM users WHERE username=?",[username])
    .then(([results, fields]) => {
        if(results && results.length == 1)
        {
            //console.log("success");
            //res.json(results);
            console.log(results[0]);
            userid = results[0].idusers;

            return bcrypt.compare(password, results[0].password);
            //resultpswd = results[0].password;
            //return [results, fields];

        }
        else
        {
            console.log("fail");
            throw new UserError('user does not exist','/login', 500);
        }
        //db.end();
    })
    .then((result) => {
        console.log("ok here");
        if(result)
        {
            //console.log("logged");
            successPrint('logged');
            req.session.username = username;
            req.session.userid = userid;
            res.locals.logged = true;
            successPrint(req.session.userid);
            successPrint(res.locals.logged);
            req.flash('success','youre logged');
            console.log(req.session.userid);
            req.session.save(() => {
                res.redirect('/');

            });
            //res.render('partials/home',{script: 'home.js'});
            //res.redirect('/');
        }
        else
        {
            throw new UserError("invalid username or password", '/login', 200);
        }
        //let result = false;
        /*bcrypt.compare(password, resultpswd).then((r) => {
            //result = r;
            if(r)
            {
                res.redirect('/');
            }
            else{
                throw new UserError('login failed, password incorrect', '/login', 500);
            }
        }).catch((err) => {
            errorPrint('user could not be logged in', err);
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
        /*if(r)
        {
            res.redirect('/');
        }*/

    })
    .catch((err) => {

        errorPrint('user could not be logged', err);
        if(err instanceof UserError)
        {
            errorPrint(err.getmessage());
            res.status(err.getStatus());
            req.flash('error','youre not logged');
            res.render('partials/login', {script: 'login.js'});
            //console.log(req);
            //res.redirect(err.getRedirectURL());
        }
        else
        {
            next(err);
        }
    });
    //res.render('index', {name:'gkjuhjdfkjsdf'});
});

module.exports = router;