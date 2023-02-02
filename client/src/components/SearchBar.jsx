import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchCountries } from "../actions";
import '../components/SearchBar.css';

export default function SearchBar() {
  const [search, setSearch] = useState('');
  const dispatch = useDispatch();

  function onSubmit(e) {
    e.preventDefault();
    if (search.length === 0) return alert( 'Debes ingresar un país existente');
    dispatch(searchCountries(search))
    setSearch('')
  }

  function onInputChange(e) {
    e.preventDefault();
    setSearch(e.target.value)
  }

  return (
    <div>
      <form className='form' onSubmit={onSubmit}>
        <input  type='text' placeholder='Elegí un país...' onChange={onInputChange} value={search}/>
        <input className='btn' type='submit' value='Buscar'/>
      </form>
    </div>
  )
}