const userController = require("../Controllers/user.controller");

module.exports=(app)=>{
    app.get("/ecomm/api/v1/users",userController.findAll);
}