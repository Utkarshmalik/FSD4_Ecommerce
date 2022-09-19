
const categoryControllers= require("../Controllers/category.controllers");


module.exports =(app)=>{

    //create a new category
    app.post("/ecomm/api/v1/category",categoryControllers.create);

    //get all the routes 
    app.get("/ecomm/api/v1/category",categoryControllers.getAll);

    //get a route by category id
    app.get("/ecomm/api/v1/category/:id",categoryControllers.getOne);

    //update a route by category id 
    app.put("/ecomm/api/v1/category/:id",categoryControllers.update);

    //delete a route by a category id 
    app.delete("/ecomm/api/v1/category/:id",categoryControllers.delete);

}