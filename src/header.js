import React,  {useState, useRef, useEffect}from 'react';
import { useHistory } from 'react-router-dom';

function App() {
     let home = useHistory();
return (
    <div className="header">
    <h1 style={{cursor: 'pointer'}} onClick={()=>{
        home.push('./')
    }}>YTDS</h1>
    </div>
);
}

export default App;