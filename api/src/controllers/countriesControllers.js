const axios = require ('axios');
const {Countries, Activities} = require ('../db');


async function  getApiInfo() {
    const apiUrl = await axios.get("https://restcountries.com/v3/all") // traigo toda la info de la api 
    const apiInfo = await apiUrl.data.map(el => {
            return {
            id: el.cca3,
            name: el.name.common,
            img: el.flags[1],
            continents: el.continents[0],
            capital : ( el.capital || []).length === 0 ? "No tiene capital" : el.capital[0] ,
            subregion: el.subregion,     
            area: el.area,
            population: el.population,
            borders: el.borders? el.borders.map(border=> {return border}) : "No limita con ningun pais", 
            
        }; //traigo solo los datos que necesito
}); 

    return apiInfo;
    
};
async function getDbInfo () {
    //traigo info de base de datos con findAll 
    return await Countries.findAll({
      includes: Activities,
             
    })
} 

//junto la info y la devuelvo
async function getAllCountries (){
    const apiInfo = await getApiInfo(); // llamo a la función
    const dbInfo = await getDbInfo();// llamo a la función
    const infoTotal = dbInfo.concat(apiInfo); //concateno
       return infoTotal;
}



async function countriesID (req, res){
    const id = req.params.id; 
    let countriesTotal = await getAllCountries();
    
    if (id) {
        let countriesId = await countriesTotal.filter ( el => el.id.toLowerCase()===(id.toLowerCase()))
        countriesId.length ?

        res.status(200).json(countriesId) :
        res.status(404).send('No existe ese Pais');

    }
    
}



 async function allCountries (req, res) { 
    let allCountries = await Countries.findAll({include:Activities}); //consulta la base de datos
    const id = req.query.id; //lo puedo buscar por id 
    const name = req.query.name; //lo puedo buscar por name

    if(!allCountries.length){ 
        allCountries = await getApiInfo();
        await Countries.bulkCreate(allCountries); //se guarda la info en base de datos 
    }
    if (id) {
        let countriesId = allCountries.filter( el => el.id.toLowerCase()===id.toLowerCase())
        return countriesId.length ?
        res.status(200).send(countriesId) :
        res.status(404).send('No existe ese Pais');
    }
    if (name) {
        let countriesName = allCountries.filter( el => el.name.toLowerCase().includes(name.toLowerCase()))
        return countriesName.length ?
        res.status(200).send(countriesName) :
        res.status(404).send('No existe ese Pais');
    }
        return res.status(200).json(allCountries)
  
}


module.exports ={
    getApiInfo,
    getDbInfo,
    getAllCountries,
    countriesID,
    allCountries
 }
