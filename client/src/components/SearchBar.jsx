import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameCountries } from "../actions";
import '../components/SearchBar.css';


export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleImputCountries(el){
        el.preventDefault()
        setName(el.target.value)
        console.log(name)    
    }
    function handleSubmit(el){
        el.preventDefault()
        if(!name) return alert("Debes ingresar un pais")
        dispatch(getNameCountries(name))
        setName ("") // Aqui se limpia el valor del imput
        setCurrentPage(1)
    }

    return(
        <div>
            
            <div className="containerr">      
                <input type= 'text'  placeholder = ' Buscar...' onChange={(el) => handleImputCountries(el)} />
                <div className="btnn">
                    <button className="search" type="submit"  onClick={(el)=> handleSubmit(el)} >Buscar</button>
                </div>
            </div>
        </div>

    )
}