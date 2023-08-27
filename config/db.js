const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "tourism"
})

connection.connect(function(err){
  if(err){
    console.log("err connectig " + err.stack);
    return
  }
  console.log("Correct connection " + connection.threadId);
});

module.exports = connection;