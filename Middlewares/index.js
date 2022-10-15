const path=require('path');
const requestValidator = require(path.join(__dirname,"./requestValidator"));
const signUpValidator = require(path.join(__dirname,"./signUpValidator"));
const authJWT = require(path.join(__dirname,"./authJWT"));


module.exports={
    requestValidator,
    signUpValidator,
    authJWT
}