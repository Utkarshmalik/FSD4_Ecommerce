const config=require("../configs/db.config");
const Sequelize = require("sequelize");


const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host:config.HOST,
        dialect:config.dialect,
        operatorAliases:false,
        pool:{
            max:config.pool.max,
            min:config.pool.min,
            acquire:config.pool.acquire,
            idle:config.pool.idle
        }
    }
);

const db={};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Category = require("./category.model")(Sequelize,sequelize);
db.Product= require("./product.model")(Sequelize,sequelize);
db.User = require("./user.model")(Sequelize,sequelize);
db.Role = require("./role.model")(Sequelize,sequelize);
db.Cart = require("./cart.model")(Sequelize,sequelize);

 
db.Category.hasMany(db.Product,{
    foreignKey:"categoryId"
});
db.Product.belongsTo(db.Category);

db.Role.belongsToMany(db.User,{
    through:"userRoles",
    foreignKey:"roleId",
    otherKey:"userId"
});

db.User.belongsToMany(db.Role,{
    through:"userRoles",
    foreignKey:"userId",
    otherKey:"roleId"
})

db.User.hasOne(db.Cart);
db.Cart.belongsTo(db.User);

db.Product.belongsToMany(db.Cart,{
    through:"cart_products",
    foreignKey:"productId",
    otherKey:"cartId"
});

db.Cart.belongsToMany(db.Product,{
    through:"cart_products",
    foreignKey:"cartId",
    otherKey:"productId"
});



db.ROLES = ["user","admin"];

module.exports=db;

