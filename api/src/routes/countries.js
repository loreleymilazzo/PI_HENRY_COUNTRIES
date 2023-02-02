const { Router } = require('express');
const axios = require ('axios');
const {Countries, Activities} = require ('../db')

const { countriesID,allCountries} = require('../controllers/countriesControllers.js');

const router = Router();


router.get('/countries/:id',countriesID )


router.get('/countries',allCountries )

module.exports = router;