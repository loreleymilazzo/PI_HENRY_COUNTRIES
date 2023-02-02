import React, {useState, useEffect} from "react";
import {Link, useHistory} from "react-router-dom";
import {addActivities, getActivities} from "../actions/index";
import {useDispatch, useSelector} from "react-redux";
import mundito from "../pictures/countries.png";
import './ActivitiesCreate.css';

function validate(input){   
    let errors = {};
    if (!input.name) {
        errors.name = 'completar nombre';
    } else if (!typeof(input.name) === 'string') {
        errors.name = 'el nombre no es válido';
    }
    if (!input.dificultad) {
        errors.dificultad = 'completar dificultad';
    } else if (!typeof(input.dificultad) === 'number' || input.dificultad < 0 || input.dificultad > 5) {
        errors.dificultad = 'el numero no es válido';
    }
       
    if (!input.duracion) {
        errors.duracion = 'completar duracion ';
    } else if (!typeof(input.duracion) === 'number' || input.duracion < 0 || input.duracion > 12){
        errors.duracion = 'debe ser entre 1 y 12';
    }
       
    if (!input.temporada) {
        errors.temporada = 'completar temporada';
    } else if (!typeof(input.temporada) === 'string') {
        errors.temporada = 'elegir una temporada existente';
    }
    return errors;
}

export default function ActivitiesCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state)=> state.countries)
    
    const [errors, setErrors] = useState({});
    const [input, setInput] = useState({
        name: "",
        dificultad:"", // []
        duracion: "",
        temporada: "", // []
        countriesId: [],
    });
    
    function handleChange(el){
    
        
        setInput({
            ...input,
            [el.target.name]: el.target.value
        })
        setErrors(validate({
            ...input,
            [el.target.name]: el.target.value
        }
        ));
        console.log(input)
    }
    function handleCheck(el){
        if (el.target.checked){
            
            setInput({
                ...input,
                [el.target.name]:el.target.value
                
            })
            setErrors(validate({
                ...input,
                [el.target.name]: el.target.value
            }
            ));
        }
    }
    function handleSelect(el){
        const country = countries.find(c=>c.id === el.target.value)
          setInput({
            ...input,
            countriesId: [...input.countriesId,country]
        })
    }

    function handleSubmit(el){
        el.preventDefault();
        console.log(input)
        dispatch(addActivities(input))
        alert("Actividad Creada")
        setInput({
            name: "",
            dificultad:[], 
            duracion: "",
            temporada: []
        })
        history.push('/home')
    }

    function handleDelete(el){
        setInput({
            ...input, // se trae el estado anterior
            countriesId: input.countriesId.filter(occ => occ !== el)
        })
    }

    useEffect(() => {
        dispatch(getActivities());
    },[dispatch]);

    return (
        <div className="container act">
                    <div className="imagen">
                    <img src={mundito} alt='' ></img>
                    </div>
            <h1>Crea tu Actividad</h1>
            <form onSubmit={(el)=>handleSubmit(el)}>
                <div className="act1">
                    <label>Actividad:</label>
                    <input
                    type = "text"
                    required
                    value= {input.name}
                    name= "name"
                    onChange={(el)=>handleChange(el)}
                    />
                    {errors.name && (
                        <p className="error">{errors.name}</p>
                        )}
                </div>
                <div className="dif1">
                    <label>Dificultad:</label>
                    <label><input
                    type = "radio"
                    required
                    name= "dificultad"
                    value= "1"
                    onChange={(el)=>handleCheck(el)}
                    />1</label>   
                    <label><input
                    type = "radio"
                    name= "dificultad"
                    value= "2"
                    onChange={(el)=>handleCheck(el)}
                    />2</label>   
                    <label><input
                    type = "radio"
                    name= "dificultad"
                    value= "3"
                    onChange={(el)=>handleCheck(el)}
                    />3</label>
                    <label><input
                    type = "radio"
                    name= "dificultad"
                    value= "4"
                    onChange={(el)=>handleCheck(el)}
                    />4</label>     
                     <label><input
                    type = "radio"
                    name= "dificultad"
                    value= "5"
                    onChange={(el)=>handleCheck(el)}
                    />5</label>
                    {errors.dificultad && (
                        <p className="error">{errors.dificultad}</p>
                        )}     
                </div>
                <div className="dur1">
                    <label>Duracion:</label>
                    <input
                    type = "number"
                    required
                    min="1"
                    max="12"
                    value= {input.duracion}
                    name= "duracion"
                    onChange={(el)=>handleChange(el)}
                    />
                    {errors.duracion && (
                        <p className="error">{errors.duracion}</p>
                    )} 
                </div>
                <div className="tem1">
                    <label>Temporada:</label>
                    <label><input
                    type = "radio"
                    required
                    name= "temporada"
                    value= "Verano"
                    onChange={(el)=>handleCheck(el)}
                    />Verano</label>          
                    <label><input
                    type = "radio"
                    name= "temporada"
                    value= "Otoño"
                    onChange={(el)=>handleCheck(el)}  
                    />Otoño</label>  
                    <label><input
                    type = "radio"
                    name= "temporada"
                    value= "Invierno"
                    onChange={(el)=>handleCheck(el)}
                    />Invierno</label> 
                    <label><input
                    type = "radio"
                    name= "temporada"
                    value= "Primavera"
                    onChange={(el)=>handleCheck(el)}
                    />Primavera</label>
                    {errors.temporada && (
                        <p className="error">{errors.temporada}</p>
                        )} 
                </div>
                <select onChange={(el)=>handleSelect(el)}required>
                <option value = '' > Elegí un país...</option>
                    {countries.map((count)=>(
                        
                        <option value={count.id}>{count.name}</option>
                    ))}
                </select>
                
                <button >Crear Actividad</button>        

            </form>
            <div className="caja-de-paises">
                {input.countriesId.map(el=> 
                    <div className = "divOcc">
                        <p>{el.name}</p>
                        <img src={el.img} alt="" />
                        <button className="botonX" onClick={() => handleDelete(el)}>X</button>
                        </div>
                    )}

            </div>
            <Link to= '/home'><button>Volver</button></Link>
            
        </div>
    )
    
    

}