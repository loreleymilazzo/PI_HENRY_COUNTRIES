import axios from 'axios';

export function searchCountries(search) {
    return async function (dispatch) {
      try {
        var json = await axios.get(
          "/countries?name=" + search
        );
        return dispatch({
          type: "SEARCH_COUNTRIES",
          payload: json.data,
        });
      } catch (error) {
        alert("El país no existe");
      }
    };
  }

export function getCountries() {
    return async function (dispatch) {
        var json = await axios.get("/countries",{

        });
        return dispatch({
        type: 'GET_COUNTRIES',
        payload: json.data
    })
}
}

export function getNameCountries(name){
    return async function(dispatch){
        try {
            var json = await axios.get("/countries?name="+ name);
            return dispatch({
                type: "GET_NAME_COUNTRIES",
                payload: json.data
            });
        }catch(error){
            console.log(error)
            alert("Debes ingresar un pais Existente")
        }
    }
}

export function getActivities() {
    return async function (dispatch) {
        var info = await axios.get("/activities",{

        });
        
        return dispatch({
        type: 'GET_ACTIVITIES',
        payload: info.data
    })
}
}

export function addActivities(payload) {
    return async function (dispatch) {
        
        var info = await axios.post("/activities", payload);
        return dispatch({
        type: 'ADD_ACTIVITIES',
        payload: info.data
    })
}
}

export function filterCountriesByRegion(payload){
    return{
        type: 'FILTER_BY_REGION',
        payload
    }
}

export function filterCreated(payload){
    return{
        type: 'FILTER_CREATED',
        payload
    }
}

export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByPopulation(payload){
    return{
        type: 'ORDER_BY_POPULATION',
        payload
    }
}




export function getDetail (id){
    return async function(dispach){
        try {
            var json = await axios.get(`/countries?id=${id}`);           
            return dispach({
                type: "GET_DETAILS",
                payload: json.data[0]
            })
        } catch (error) {
            console.log(error)
            
        }
    }
}


export function clearDetail() {
    return {
    type: "CLEAR_DETAIL"
    };
    }




