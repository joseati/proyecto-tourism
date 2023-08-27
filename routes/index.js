var express = require('express');
var router = express.Router();
const indexController = require("../controllers/indexController")

/* GET home page. */
// http://localhost:3000/
router.get('/', indexController.showAllLocatios);

module.exports = router;
