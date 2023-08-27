const express = require ("express")
const router = express.Router()
const multer = require("../middleware/multer")
const placeController = require("../controllers/placeController")

// Ruta dinamica para obtener el id de params
//  http://localhost:3000/places/createPlace/:location_id
router.post("/createPlace/:location_id",multer("places") ,placeController.createPlace);

// Ruta get dinamica de Borrado logico de place
// http://localhost:3000/places/delLogicPlace/:place_id
router.get("/delLogicPlace/:place_id", placeController.deleteLogicPlace)

// Ruta dinamica que abre el formulario para editar un artista
// http://localhost:3000/places/formEditPlace/:place_id
router.get("/formEditPlace/:place_id", placeController.formEditArtist )

// Ruta post Envia informacion actualizada de place a base de datos
// http://localhost:3000/places/editPlace/:place_id
router.post("/editPlace/:place_id", placeController.editPlace)

// Ruta para mostrar un lugar
// http://localhost:3000/places/onePlace/:place_id
router.get("/onePlace/:place_id", placeController.showOnePlace)

module.exports = router