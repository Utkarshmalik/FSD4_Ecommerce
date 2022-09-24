
const {signUpValidator} = require("../Middlewares");


module.exports=function(app){    

    app.post("/ecomm/api/v1/auth/signup",signUpValidator.checkDuplicateEmailOrUserName)
}