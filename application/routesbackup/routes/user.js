var express = require('express');
var router = express.Router();
var db = require('../config/database');
var bcrypt = require('bcrypt');
//var usererror = require('../helpers/error/usererror');
const UserError = require('../helpers/error/usererror');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');


router.get('/', (req, res, next) => {
    res.json({username: req.session.username, id: req.session.userid});
})

router.post('/', (req, res, next) => {
    console.log(req.body);
    res.json({test: "test"});
})

router.get('/:id', (req, res, next) => {
    //console.log(req.session.id);
    res.json({username: req.params.id});
})

router.get('/details/:id', (req, res, next) => {
    db.execute("SELECT `username` FROM `termproject`.`users` WHERE `idusers`=?",[req.params.id])
    .then(([results, fields]) => {
        if(results && results.length == 1)
        {
            successPrint("we got user data");
            res.send({username: results[0].username});
        }
        else
        {
            errorPrint("undefined user");
            res.send({username: "_deleted"});
        }
    }).catch((err) => {
        next(err);
    })
})

module.exports = router;