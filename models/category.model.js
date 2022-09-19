

module.exports= (Sequelize,sequelize)=>{

    const Category= sequelize.define("category",{

        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        description:{
            type:Sequelize.STRING
        }
    },{
        tableName:'categories' 
    });

    return Category;
}