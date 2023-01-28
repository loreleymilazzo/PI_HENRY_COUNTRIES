const { Router } = require('express');
const axios = require ('axios');
const {Countries, Activities} = require ('../db');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.post('/activities', async (req, res) =>{
    const {
        name,
        dificultad,
        duracion,
        temporada,
        countriesId
    } = req.body

    if(!name || !dificultad || !duracion || !temporada|| !countriesId){
        return res.status(404).send("Debe completar todos los campos");
      }
      try {
          
          const activitiesCreated = await Activities.create ({
              name,
              dificultad,
              duracion,
              temporada,
              
            })
            
              
        for (let i = 0; i < countriesId.length; i++) {
            await activitiesCreated.addCountries(countriesId[i].id);       
        }
        return res.status(200).json(activitiesCreated)      
      } catch (error) {
        res.send(error);
      }
});

router.get('/activities', async (req, res) => {

    const activities = await Activities.findAll();
    if(activities.length) {
      return res.status(200).json(activities);
    }
    return res.status(200).send([]);


});
module.exports = router;
