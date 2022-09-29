const jwt=require("jsonwebtoken");
const {User} = require("../models");

const verifyToken= (req,res,next)=>{

    let token=req.headers["x-access-token"];

    if(!token){
        return res.status(403).send({message:"JWT Token is missing"});
    }

   
     jwt.verify(token,process.env.SECRET_KEY, async function(err,decoded){

        if(err){
            return res.status(401).send({message:"Unauthorized!"});
        };
        const userId=decoded.id;
         const user= await User.findByPk(userId);
         const roles = await user.getRoles();

         const eligibleRoles=[];

         roles.forEach(role=>{
             eligibleRoles.push(role.name);
         })

         req.user=user;
         req.roles=eligibleRoles;
         req.isAdmin=eligibleRoles.includes('admin');
         next();
    });
}


const authJWT={
    verifyToken:verifyToken
}

module.exports=authJWT;