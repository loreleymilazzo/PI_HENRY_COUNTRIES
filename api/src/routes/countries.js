const { Router } = require('express');
const axios = require ('axios');
const {Countries, Activities} = require ('../db')

const {getApiInfo,getDbInfo, getAllCountries, countriesID,allCountries} = require('../controllers/countriesControllers.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);




router.get('/countries/:id',countriesID )


router.get('/countries',allCountries )

module.exports = router;