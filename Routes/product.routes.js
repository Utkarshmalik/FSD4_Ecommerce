
const ProductControllers= require("../Controllers/product.controllers");
const {requestValidator, authJWT} = require("../Middlewares");

module.exports=(app)=>{
    app.post("/ecomm/api/v1/products",[requestValidator.validateProductRequest, authJWT.verifyToken],ProductControllers.create)

    app.get("/ecomm/api/v1/products",ProductControllers.findAll);

    app.get("/ecomm/api/v1/products/:id",ProductControllers.findOne);

    //update 
    //delete 

    //Route for getting a list of products under a particular category
    app.get("/ecomm/api/v1/category/:categoryId/products",requestValidator.validateCategoryPassed,ProductControllers.findProductsUnderCategory);


    //you want a product with a productId under a category as categoryId
    app.get("/ecomm/api/v1/category/:categoryId/products/:productId",requestValidator.validateCategoryAndProductPassed,ProductControllers.findProductUnderCategory);


}
