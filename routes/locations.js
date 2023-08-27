var express = require('express');
var router = express.Router();
let multer = require ("../middleware/multer")
const locationController = require("../controllers/locationsController")

/* 1  http://localhost:3000/locations*/
// Hay que cambiarlo ahora no hace nada
router.get('/', locationController.showAllLocatios);

// 2  http://localhost:3000/locations/formCreateLocation
// Abre el formulario de crear  locations
router.get("/formCreateLocation", locationController.formCreateLocation)

//2.1 Router Post 
// http://localhost:3000/locations/createLocation
//  Envia datos del formulario a la base de datos
router.post("/createLocation",multer("locations"), locationController.createLocation)

// 3 
// http://localhost:3000/locations/oneLocation/:location_id
router.get("/oneLocation/:location_id",locationController.showOneLocation)

module.exports = router;
