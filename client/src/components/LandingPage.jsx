import React from 'react';
import {Link} from 'react-router-dom';
import "./LandingPage.css";

export default function LandingPage(){
    return(
        <header  >
        <div className='texto' >
            <h1>Countries</h1>
            {/* <p>PI Henry's</p> */}
            <Link to ='/home'>
                <button>Inicio</button>
            </Link>
        </div>
        </header>
    )
}