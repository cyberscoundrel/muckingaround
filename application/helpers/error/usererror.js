class UserError extends Error{
    constructor(message, redirectURL, status){
        super(message);
        this.redirectURL = redirectURL;
        this.status = status;
    }

    getmessage(){
        return this.message;
    }

    getRedirectURL(){
        return this.redirectURL;
    }

    getStatus(){
        return this.status;
    }
}

module.exports = UserError;