var express = require('express');
var router = express.Router();
var db = require('../config/database');
var bcrypt = require('bcrypt');
//var usererror = require('../helpers/error/usererror');
const UserError = require('../helpers/error/usererror');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var {v4 : uuidv4} = require('uuid');


router.post('/', (req, res, next) => {
    //console.log(req);
    console.log(req.header('Referer').split('/')[5]);
    db.execute("INSERT INTO `termproject`.`comments` (`commentid`,`fkuserid`,`fkpostid`,`comment`) VALUES (?,?,?,?)",[uuidv4(),req.session.userid,req.header('Referer').split('/')[5] ,req.body.comment])
    .then(([results, fields]) => {
        if(results && results.affectedRows)
        {
            successPrint("new comment");
            res.send({message:"yes"});
        }
        else
        {
            errorPrint("comment problem");
            res.send({message:"no"});
        }
    })
    .catch((err) => {
        next(err);
    })

})

router.get('/get/:id', (req, res, next) => {
    db.execute("SELECT `commentid`,`fkuserid`,`fkpostid`,`comment`,`created` FROM `termproject`.`comments` WHERE `fkpostid`=?",[req.params.id])
    .then(([results, fields]) => {
        if(results && results.length > 0)
        {
            successPrint("comments retrieved");
            res.send({message: "" + results.length + " comments", results: results});
        }
        else
        {
            errorPrint("no comments retrieved");
            res.send({message:"no comments found", results: {}});
        }
    }).catch((err) => {
        next(err);
    });
})

router.get('/get', (req, res, next) => {
    console.log(req.header('Referer').split('/')[5]);
    if(req.header('Referer'))
    {
        db.execute("SELECT `commentid`,`fkuserid`,`fkpostid`,`comment`,`created` FROM `termproject`.`comments` WHERE `fkpostid`=?",[req.header('Referer').split('/')[5]])
        .then(([results, fields]) => {
            if(results && results.length > 0)
            {
                successPrint("we got comments");
                successPrint("" + results.length + "comments found");
                res.send({message: "we got comments", results:results});
            }
            else
            {
                errorPrint("no comments");
                res.send({message: "no comments", results: {}});
            }
        }).catch((err) => {
            next(err);
        });
    }
})


module.exports = router;