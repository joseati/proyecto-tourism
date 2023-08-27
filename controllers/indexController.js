const connection = require("../config/db")

class IndexController{
  
  showAllLocatios = (req,res) => {
    let sql = "SELECT * FROM location"

    connection.query(sql,(err,result) => {
      if(err) throw err;
      res.render("index", {result})

    })
  }

}

module.exports = new IndexController