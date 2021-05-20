var db = require('../config/database');
var {v4: uuidv4} = require('uuid');
var {errorPrint, successPrint} = require('../helpers/debug/debugprinters');
const CommentModel = {};

CommentModel.create = (userid, postid, comment) => {
    let commentid = uuidv4();
    return db.execute("INSERT INTO `termproject`.`comments` (`commentid`,`fkuserid`,`fkpostid`,`comment`) VALUES (?,?,?,?)",[commentid,userid,postid,comment])
    .then(([results, fields]) => {
        if(results && results.affectedRows)
        {
            successPrint("new comment");
            return Promise.resolve(commentid);
            //res.send({message:"yes"});
        }
        else
        {
            errorPrint("comment problem");
            return Promise.resolve(0);
            //res.send({message:"no"});
        }
    })
    .catch((err) => {
        Promise.reject(err);
    })

};

CommentModel.get = (postid) => {
    return db.execute("SELECT `commentid`,`fkuserid`,`fkpostid`,`comment`,`created` FROM `termproject`.`comments` WHERE `fkpostid`=?",[postid])
    .then(([results, fields]) => {
        if(results && results.length > 0)
        {
            successPrint("comments retrieved");
            return Promise.resolve(results);
            //res.send({message: "" + results.length + " comments", results: results});
        }
        else
        {
            /*errorPrint("no comments retrieved");
            res.send({message:"no comments found", results: {}});*/
            return Promise.resolve(0);
        }
    }).catch((err) => {
        Promise.reject(err);
    });

};


module.exports = CommentModel;