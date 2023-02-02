import React from "react";
import './Detail.css'



export default function CardActivities({name, dificultad , duracion, temporada }) {
    return(

<div className="body1">
    <div className='card-g1'>
        <div className='face fuente'>
            <h2>Actividad: {name}</h2>
            <h4>Dificultad: {dificultad}</h4>
            <h4>Duracion: {duracion}</h4>
            <h4>Temporada: {temporada}</h4>             
        </div>
    </div>
        
</div>



    );
}