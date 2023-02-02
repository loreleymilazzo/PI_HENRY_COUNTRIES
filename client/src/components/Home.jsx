import React, { useState } from 'react';
import { useEffect } from 'react';
import {useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCountries, filterCountriesByRegion, orderByName, getActivities, filterCreated, orderByPopulation } from "../actions";
import Card from './Card'
import Paginado from './Paginado';
import SearchBar from './SearchBar';
import './Home.css';
import africa from "../pictures/africa.png";
import Asia from "../pictures/Asia.png";
import europa from "../pictures/europa.png";
import suramerica from "../pictures/suramerica.png";
import norteamerica from "../pictures/norteamerica.png";
import oceania from "../pictures/oceania.png";
import antartida from "../pictures/antartida.png";
import mundo from "../pictures/mundo.png";



export default function Home () {
    const dispatch = useDispatch()
    const activities = useSelector((state)=> state.activities)
    const allCountries = useSelector ((state)=> state.countries) // es lo mismo que hacer el MyStateToProps
    const [currentPage, setCurrentPage] = useState(1)
    const [orden, setOrden] = useState ('');
    const [countriesPerPage, setCountriesPerPage] = useState(9);
   // const [countriesPerPage] = useState(10)  cantidad de card que quiero que se muestre 
    const indexOfLastCountries = currentPage * countriesPerPage
    const indexOfFirstCountries = indexOfLastCountries - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountries, indexOfLastCountries)


    const handlePageChange = (page) => {
        if (page === 1) {
          setCountriesPerPage(9);
        } else {
          setCountriesPerPage(10);
        }
        setCurrentPage(page);
      };


    // const paginado = (pageNumber)=> {
    //     setCurrentPage(pageNumber)
    // }
    

useEffect(()=>{
    dispatch(getCountries());
    dispatch(getActivities());
   },[dispatch]);
     
function handleClick(el){
    el.preventDefault();
    dispatch(getCountries());
    };

function handleSort (el){
    el.preventDefault();
    dispatch(orderByName(el.target.value))
    setOrden(`Ordenado ${el.target.value}`)
    setCurrentPage(1)
    setCountriesPerPage(9)
    };

function handleSortP (el){
    el.preventDefault();
    dispatch(orderByPopulation(el.target.value))
    setOrden(`Ordenado ${el.target.value}`)
    setCurrentPage(1)
    setCountriesPerPage(9)
    };    
  

function handleSelect (el){
    el.preventDefault();
    dispatch(filterCreated(el.target.value))    
    };
function handleFilterRegion(el){
    dispatch(filterCountriesByRegion(el.target.value))
    setCurrentPage(1)
     setCountriesPerPage(9)
    }

return(
<div>
    <div className='encabezado'>

        <div className='container barr'>
       
            <h1>Countries</h1>
            <div className='actividad'>
                <div >
                    <Link to= '/activities' >Crear Actividades</Link>
                </div>
                <div className='filtro-act'>
                    <select onChange={(el)=>handleSelect(el)}>
                    <option value = 'sin filtro'>Actividad</option>
                        {activities.map((act)=>(
                    <option value={act.name}>{act.name}</option>
                     ))}
                    </select>
                </div>
            </div>  
            <div className='ordenar'>
            <select onClick={el=> {handleSort(el);}}>
                <option value = ''>Orden Alfabetico</option>
                <option value = 'asc'>A-Z</option>
                <option value = 'desc'>Z-A</option>
            </select> 
            </div>             
            <div className='ordenar'>
            <select onClick={el=> {handleSortP(el)}}>
                <option value = ''>Población</option>
                <option value = 'asc'>Ascendente</option>
                <option value = 'desc'>Descendente</option>
            </select> 
            </div>
            
            <div className='barr2'>
                <button onClick={el=> {handleClick(el)}}>
                Todos los Paises
                </button>
            </div>
            <div>
                <SearchBar setCurrentPage={setCurrentPage}/>
            </div>
        </div>
    </div>
    <div className='container app-cont'>
        <div className='barr3'>
            <Paginado currentPage={currentPage} allCountries={allCountries.length} countriesPerPage={countriesPerPage} paginado={handlePageChange}/>
            
        </div>
        <div className= "container grid">
            {currentCountries.map(c=>{
            return ( 
                <div className='item' >
                    <Link to= {`/detail/${c.id}`} >              
                        <Card  key= {c.id} name= {c.name} img= {c.img} continents={c.continents} platillo= {c.platillo}capital = {c.capital} />
                    </Link> 
                </div>         
                );
            })}          

        </div>
    </div>
        <div className='form'>
            <div className='bloq1'>
                <div>
                <img src={mundo} alt=''></img>
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}} value='All'/>Todos
                </div>
                <div>
                    <img src={europa} alt=''></img>
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Europe'}/> Europa
                </div>
                <div>
                    <img src={Asia} alt=''></img>
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Asia'}/> Asia
                </div> 
                <div>
                    <img src={africa} alt=''></img>
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Africa'}/> Africa
                </div>
            
                <div className='suramerica'>
                    <img src={suramerica} alt=''></img>
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'South America'}/> Sur America
                </div>
                <div>
                    <img src={norteamerica} alt=''></img>
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'North America'}/> Norte America
                </div>
                <div>
                    <img src={oceania} alt=''></img>
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Oceania'}/> Oceania
                </div>
                <div>
                    <img src={antartida} alt=''></img>
                    <input type= 'radio' name="continents" id="continents" onChange={(el)=> {handleFilterRegion(el)}}  value={'Antarctica'}/> Antartida
                </div>
            </div>

        </div>
</div>
)
}