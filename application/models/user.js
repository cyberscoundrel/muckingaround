var db = require('../config/database');
var bcrypt = require('bcrypt');
const UserModel = {};

UserModel.create = (username, password, email) => {
    return bcrypt.hash(password, 10)
    .then((hashedPassword) => {
        console.log(hashedPassword);
        return db.execute("INSERT INTO `termproject`.`users` (`idusers`,`username`,`password`,`email`) VALUES (UUID(),?,?,?)", [username, hashedPassword, email]);

    })
    .then(([results, fields]) => {
        if(results && results.affectedRows)
        {
            return Promise.resolve(results.insertId);

        }
        else
        {
            return Promise.resolve(-1);

        }
    }).catch((err) => Promise.reject(err));

};

UserModel.usernameExists = (username) => {
    return db.execute("SELECT * FROM `termproject`.`users` WHERE username=?",[username])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    }).catch((err) => Promise.reject(err));

};

UserModel.emailExists = (email) => {
    return db.execute("SELECT * FROM `termproject`.`users` WHERE email=?",[email])
    .then(([results, fields]) => {
        return Promise.resolve(!(results && results.length == 0));
    }).catch((err) => Promise.reject(err));


};

UserModel.authenticate = (username, password) => {
    let userid;

    return db.query("SELECT idusers,username,password FROM users WHERE username=?",[username])
    .then(([results, fields]) => {
        if(results && results.length == 1)
        {
            console.log(results[0]);
            userid = results[0].idusers;
            bcrypt.hash(password,10).then((pass) => console.log(pass));

            return bcrypt.compare(password, results[0].password);
        }
        else
        {
            return Promise.reject(-1);
        }
    })
    .then((passwordsMatch) => {
        if(passwordsMatch)
        {
            console.log("here we are");
            console.log(userid);
            return userid;
            //Promise.resolve(userid);
        }
        else
        {
            Promise.resolve(-1);
        }
    }).catch((err) => Promise.reject(err));

};

module.exports = UserModel;