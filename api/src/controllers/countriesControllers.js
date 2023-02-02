const axios = require ('axios');
const {Countries, Activities} = require ('../db');


async function  getApiInfo() {
    const apiUrl = await axios.get("https://restcountries.com/v3/all")  
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
            platillo: el.platillo,
        }; 
}); 

    return apiInfo;
    
};
async function getDbInfo () {
   
    return await Countries.findAll({
      includes: Activities,
             
    })
} 

async function getAllCountries (){
    const apiInfo = await getApiInfo(); 
    const dbInfo = await getDbInfo();
    const infoTotal = dbInfo.concat(apiInfo); 
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
    let allCountries = await Countries.findAll({include:Activities}); 
    const id = req.query.id; 
    const name = req.query.name; 

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
