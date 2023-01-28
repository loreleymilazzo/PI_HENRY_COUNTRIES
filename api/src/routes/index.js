const { Router } = require('express');
const axios = require ('axios');
const {Countries, Activities} = require ('../db');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const Activity = require("./activities");
const Country = require("./countries");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/" , Activity)
router.use("/", Country)

module.exports = router;
