const { Router } = require('express');
const axios = require ('axios');
const {Countries, Activities} = require ('../db');

const {createActivity, allActivities } = require('../controllers/activityControllers.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.post('/activities', createActivity);

router.get('/activities', allActivities);
module.exports = router;
