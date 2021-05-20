var express = require('express');
var random = require('random');
var db = require('../config/database');
var router = express.Router();
const PostError = require('../helpers/error/posterror');
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var multer = require('multer');
var sharp = require('sharp');
var crypto = require('crypto');
var {v4 : uuidv4} = require('uuid');

var storage = multer.diskStorage({
    destination: function(req, file, cb){
        console.log("and in here");
        cb(null, "public/images/uploads");
    },
    filename: function(req, file, cb){
        console.log("in here");
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});

var uploader = multer({storage: storage});

router.get('/', (req, res, next) => {
    console.log("post");
    if(!req.session || !req.session.username)
    {
        res.redirect('/login');
    }
    res.render('partials/postimage', {script:'/registration.js'});

})

router.post('/', uploader.single("isub"), (req, res, next) => {
    let filepath = req.file.path;
    let filethumb = `thumbnail-${req.file.filename}`;
    let destination = req.file.destination + '/' + filethumb;
    let title = db.escape(req.body.title);
    let desc = db.escape(req.body.idesc);
    let id = uuidv4();

    sharp(filepath).resize(200).toFile(destination).then(() => {
        db.execute("INSERT INTO `termproject`.`posts` (`postid`,`post_title`,`media`,`thumb`,`userid`,`created`,`description`,`username`) VALUES (?,?,?,?,?,NOW(),?,?)",[id, title,filepath,filethumb,req.session.userid,desc,req.session.username])
        .then(([results, fields]) => {
            if(results && results.affectedRows)
            {
                successPrint("post added");
                successPrint(results.insertId);
                successPrint(results.affectedRows);
                successPrint(id);
                //id = '/' + id;
                //res.redirect(id);
                req.flash('success','new post');
                req.session.save(() => {
                    res.redirect(`/post/posts/${id}`);

                });
                //res.redirect(`/post/posts/${id}`);

            }
            else
            {
                throw new PostError('could not create post','/post', 200);
            }
        })
        .catch((err) => {
            if(err instanceof PostError)
            {
                errorPrint(err.getMessage());
                res.status(err.getStatus());
                res.redirect(err.getRedirectURL());
            }
            else
            {
                next(err);
            }
        })
    })

    console.log("post post");
    //console.log(req);
    //res.json({test: "test"});
    //res.redirect(`/post/${id}`);
})

router.get('/posts/:id', (req, res, next) => {
    db.execute("SELECT post_title,media,thumb,userid,created,comments,description,username FROM `termproject`.`posts` WHERE postid=?",[req.params.id])
    .then(([results, fields]) => {
        if(results && results.length == 1)
        {
            successPrint("found a post");
            successPrint(results[0].username);
            successPrint(results[0].post_title);
            res.render('partials/imagepost', {script: '../../post.js', post_title: results[0].post_title, username: results[0].username, image_name: results[0].media, image_date: results[0].created, image: "../../" + results[0].media, description: results[0].description});

        }
        else
        {
            throw new PostError('could not find post', '/', 500);
        }
    })
    .catch((err) => {
        if(err instanceof PostError)
        {
            errorPrint(err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        }
        else
        {
            next(err);
        }
    })
})

router.get('/search', (req, res, next) => {
    successPrint("got a search");
    successPrint(req.query);
    let queryarg = db.escape(`%${req.query.search}%`);
    console.log(queryarg);
    db.execute("SELECT `postid`,`post_title`,`thumb`, concat_ws(' ',`post_title`,`description`) AS haystack FROM `termproject`.`posts` HAVING haystack like ?", [queryarg])
    .then(([results, fields]) => {
        if(results && results.length > 0)
        {
            successPrint("items found");
            console.log(results.length);
            console.log(results);
            req.flash('success','got em');
            res.send({message:"got em",results:results});
            //res.redirect(`/post/posts/${results[0].postid}`);
        }
        else
        {
            errorPrint("no itemps found");
            req.flash('error','nothing');
            db.execute("SELECT `postid`,`post_title`,`thumb` FROM `termproject`.`posts` ORDER BY created DESC LIMIT 8",[])
            .then(([results, fields]) => {
                console.log(results.length);
                res.send({message:"nothing",results:results});
            })
        }
    });
})

router.get('/get', (req, res, next) => {
    db.execute("SELECT `postid`,`post_title`,`thumb` FROM `termproject`.`posts` ORDER BY `created` DESC LIMIT 50",[])
    .then(([results, fields]) => {
        if(results && results.length > 0)
        {
            successPrint("got front page posts");
            res.send({message:"nothing",results:results});
        }
        else
        {
            errorPrint("no front page posts");
            res.send({message:"nothing", results:{}});
        }

    }).catch((err) => {
        next(err);
    });
})

module.exports = router;