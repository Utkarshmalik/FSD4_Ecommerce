
const express = require("express");
const config = require("./configs/db.config");

const app = express();



const db=require("./models");


db.sequelize.sync({force:true})
.then(()=>{
    console.log("DB synced");
})



app.listen(process.env.PORT,()=>{
    console.log(`Application is running on port 8000`);
})