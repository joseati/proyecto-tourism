const connection = require("../config/db")
const bcrypt = require("bcrypt")

class LocationController {

  // Muestra todas las locatios 
  showAllLocatios = (req,res) => {
    let sql = "SELECT * FROM location"

    connection.query(sql,(err,result) => {
      if(err) throw err;
      res.render("allLocation", {result})

    })
  }
  // abre el formulario de inscripcion de locations
  formCreateLocation = (req,res) => {
    res.render("formCreateLocation")
  }
  createLocation = (req,res) => {
    let{ location_name, province, email,comment, telephone_number, password } = req.body;
    const salt = 10;

    if(
      location_name === ""||
      province === "" ||
      email == "" ||
      telephone_number === "" ||
      password === "" 
     ){
        return res.render("formCreateLocation",{message: "Debe rellenar los campos "})
      }

      let img;
    if(req.file != undefined){
      img = req.file.filename
    }else{
      img = ""
    }
      
    bcrypt.hash(password,salt, (err,hash) =>{
      
      let sql = `INSERT INTO location (location_name,province, email,comment, telephone_number, password, img) values ("${location_name}","${province}","${email}","${comment}","${telephone_number}","${hash}", "${img}")`

      connection.query(sql,(err,result)=>{
        if(err){
          if(err.code == 'ER_DUP_ENTRY'){
            return res.render("formCreateLocation" , {message: "Email duplicado, introduce otro email"})
          }
          else if(err.code == 'ER_DATA_TOO_LONG'){
            return res.render("formCreateLocation" , {message: "Numero de telefono muy largo"})
          }
          else{
            return res.render("formCreateLocation", { message:"Upps!!" })
          }
        }
        res.redirect("/locations")
      })
    })
    
  }

  showOneLocation = (req,res) =>{
    let{location_id} = req.params;
    let message = ""
    if(req.query.form === "error"){
      message = "Debes rellenar todos los campos"
    }

    let sql = `SELECT * FROM location WHERE 
    location_id = ${location_id}`
    let sqlPlace = `SELECT * FROM place WHERE location_id = ${location_id} and is_deleted = 0`

    connection.query(sql,(err,result)=>{
      if(err) throw err
      connection.query(sqlPlace,(err2,resultPlace)=>{
        if(err2) throw err2
        console.log("result.......", result)
        console.log("resultplacee.......", resultPlace)
        res.render("oneLocation",{result,resultPlace, message})
      })
     
    })

  }
 
}
module.exports = new LocationController()
// code: 'ER_DATA_TOO_LONG', error mas de 10 nuumeros