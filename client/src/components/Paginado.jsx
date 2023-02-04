import React from 'react';
import './Paginado.css';

export default function Paginado({ allCountries, countriesPerPage, paginado, currentPage = 1 }) {
 
  let pageNumbers = [];
  let itemsPerPage = currentPage === 1 ? 9 : 10; // en la primer pagina muestra 9, luego 10 
  for (let i = 0; i < Math.ceil(allCountries / itemsPerPage); i++) pageNumbers.push(i);
 

  return (
    <div className='paginadoContainer'>
      <div className='currentPag' onClick={() => {
        if (currentPage > 1) paginado(currentPage - 1)
      }}>{'<<'}</div>
      {
        pageNumbers.map(p => <div className='currentPag' key={p} onClick={() => paginado(p + 1)}>{p + 1}</div>)
      }
      <div className='currentPag' onClick={() => {
        if (currentPage < allCountries) paginado(currentPage + 1)
      }}>{'>>'}</div>
    </div>
  )
}