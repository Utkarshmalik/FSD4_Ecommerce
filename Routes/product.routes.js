
const ProductControllers= require("../Controllers/product.controllers");

module.exports=(app)=>{
    app.post("/ecomm/api/v1/products",ProductControllers.create)

    app.get("/ecomm/api/v1/products",ProductControllers.findAll);

    app.get("/ecomm/api/v1/products/:id",ProductControllers.findOne);
}