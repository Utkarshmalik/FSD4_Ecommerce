const {authJWT} = require("../Middlewares");
const cartControllers=require("../Controllers/cart.controller");

module.exports=function(app){

    app.post("/ecomm/api/v1/carts",[authJWT.verifyToken],cartControllers.create);


    app.get("/ecomm/api/v1/carts",[authJWT.verifyToken],cartControllers.findCart);

}