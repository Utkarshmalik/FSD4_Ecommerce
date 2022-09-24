module.exports = (Sequelize,sequelize)=>{

    const Role = sequelize.define("roles",{

        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false
        }
    });

    return Role;
};