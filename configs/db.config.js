module.exports = {
    development:{
    HOST : "localhost",
    USER : "root",
    PASSWORD : "qwerty123",
    DB : "ecom_db",
    dialect : "mysql",
    pool :{
    max :5,
    min :0,
    acquire: 30000, //max time in ms that a pool will try to getconnection before throwing error
    idle :10000 // maximum time in ms that a connection can be idlebefore being released
    }
   },
   production:{
    HOST : "sql6.freemysqlhosting.net",
    USER : "sql6526707",
    PASSWORD : "rWBe32XM45",
    DB : "sql6526707",
    dialect : "mysql",
    pool :{
    max :5,
    min :0,
    acquire: 30000, //max time in ms that a pool will try to getconnection before throwing error
    idle :10000 // maximum time in ms that a connection can be idlebefore being released
    }
   }
}