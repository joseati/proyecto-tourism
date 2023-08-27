const connection = require("../config/db")
const bcrypt = require("bcrypt")

class placeController{

  // Metodo de comprobacion 
  registerPlace = (req,res) =>{
    res.send("ok")
  }

  // Crear lugar
  createPlace = (req,res) =>{
    let {location_id} = req.params;
    let {place_name, address} = req.body;
    
    let img;
    if(req.file){
      img = req.file.filename
    }
    
    let sql =`INSERT INTO place (location_id,place_name,address,img_place) VALUES (${location_id}, "${place_name}", "${address}", "${img}")`
   
    if(place_name == "" ||
      address == "" ||
      req.file == undefined
    ){
      return res.redirect(`/locations/oneLocation/${location_id}?form=error`)
    }
    
    connection.query(sql,(err,result) => {
      console.log("res crear place", result)
      if(err) throw err

      res.redirect(`/locations/oneLocation/${location_id}`)
    })
  }

  // Borrado lógico del lugar
  deleteLogicPlace = (req,res) => {
    let  {place_id } = req.params;

    
    let sql = `UPDATE place SET is_deleted = 1 WHERE place_id = ${place_id}`

    connection.query(sql,(err,resutl) => {
      if(err) throw err;

      res.redirect(`/`)
      // Como puedo hacer que me diriga a locations//oneLocation/${location_id} si no me viene ese dato por params
    })
  }

  //Abre el formulario para cambiar datos del lugar
  formEditArtist = (req,res) => {
    let { place_id } = req.params;
    
    let sql = `SELECT * FROM place WHERE place_id = ${place_id} and is_deleted = 0`

    connection.query(sql,(err,result) => {
      if(err) throw err;
      res.render("formEditPlace", {result})
    })
  }
  // Envia informacion de editar place
  editPlace =(req,res) =>{
    let { place_id } = req.params
    let { place_name, address } = req.body;
    console.log("reqparamssss,, ", req.params)
    console.log("reqbody ", req.body)

    let sql = `UPDATE place SET place_name =" ${place_name}", address = "${address}" WHERE place_id = ${place_id};`
    
      
    connection.query(sql,(err,result) => {
       if(err) throw err

      res.redirect("/")
    })
    

  }
}

module.exports = new placeController()