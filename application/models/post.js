var db = require('../config/database');
var { errorPrint, successPrint } = require('../helpers/debug/debugprinters');
var { v4 : uuidv4} = require('uuid');
const PostModel = {};

PostModel.create = (title,filepath,filethumb,userid,desc,username) => {
    let id = uuidv4();
    return db.execute("INSERT INTO `termproject`.`posts` (`postid`,`post_title`,`media`,`thumb`,`userid`,`created`,`description`,`username`) VALUES (?,?,?,?,?,NOW(),?,?)",[id, title,filepath,filethumb,userid,desc,username])
        .then(([results, fields]) => {
            if(results && results.affectedRows)
            {
                successPrint("post added");
                successPrint(results.insertId);
                successPrint(results.affectedRows);
                successPrint(id);
                //id = '/' + id;
                //res.redirect(id);
                /*req.flash('success','new post');
                req.session.save(() => {
                    res.redirect(`/post/posts/${id}`);

                });*/
                return Promise.resolve(id);
                //res.redirect(`/post/posts/${id}`);

            }
            else
            {
                return Promise.resolve(0);
                //throw new PostError('could not create post','/post', 200);
            }
        })
        .catch((err) => {
            Promise.reject(err);
        });

};

PostModel.get = (postid) => {
    return db.execute("SELECT post_title,media,thumb,userid,created,comments,description,username FROM `termproject`.`posts` WHERE postid=?",[postid])
    .then(([results, fields]) => {
        if(results && results.length == 1)
        {
            successPrint("found a post");
            successPrint(results[0].username);
            successPrint(results[0].post_title);
            return Promise.resolve(results[0]);
            //res.render('partials/imagepost', {script: '../../post.js', post_title: results[0].post_title, username: results[0].username, image_name: results[0].media, image_date: results[0].created, image: "../../" + results[0].media, description: results[0].description});

        }
        else
        {
            return Promise.resolve(0);
            //throw new PostError('could not find post', '/', 500);
        }
    })
    .catch((err) => {
        Promise.reject(err);
    });


}

PostModel.search = (search) => {
    return db.execute("SELECT `postid`,`post_title`,`thumb`, concat_ws(' ',`post_title`,`description`) AS haystack FROM `termproject`.`posts` HAVING haystack like ?", [search])
    .then(([results, fields]) => {
        if(results && results.length > 0)
        {
            successPrint("items found");
            console.log(results.length);
            console.log(results);
            return Promise.resolve(results);
            //res.redirect(`/post/posts/${results[0].postid}`);
        }
        else
        {
            errorPrint("no itemps found");
            return Promise.resolve(0);
        }
    }).catch((err) => {
        Promise.reject(err);
    });



};

PostModel.getRecent = (numPosts) => {

    return db.execute("SELECT `postid`,`post_title`,`thumb` FROM `termproject`.`posts` ORDER BY `created` DESC LIMIT 50",[numPosts])
    .then(([results, fields]) => {
        if(results && results.length > 0)
        {
            successPrint("got front page posts");
            return Promise.resolve(results);
        }
        else
        {
            errorPrint("no front page posts");
            return Promise.results(0);
            //res.send({message:"nothing", results:{}});
        }

    }).catch((err) => {
        Promise.reject(err);
    });

}


module.exports = PostModel;