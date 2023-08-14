import React, {useState, useRef} from "react";
import axios from 'axios';

function Keyword(){

    let [data, setData] = useState(null);
    let [urlValue, setUrlValue] = useState('');
    let [err, seterr] = useState(null);
    let [loader, setloader] = useState(null);
    let [empty, setempty] = useState(false);
    
    let value = useRef(null);
    // let selects = useRef(null);
    function Paste(){
    navigator.clipboard.readText().then(e=>{
      value.current.value = ""+ value.current.value + e;
      setUrlValue(value.current.value)
      
      })
    }
    
    
    const handleConvert = async () => {
    
        setloader(true);
        setempty(urlValue === '');
        if(urlValue !== '' && data !== null){
          setData(null)
        }
        try{
    
          const data = await axios.get(
          `https://chocolate-noiseless-porkpie.glitch.me/download?url=${urlValue}`)
          setData(data);
          
        setUrlValue("");
      
        seterr(false)
      }
        catch(err){
          if(err){
            setloader(false);
            seterr(true)
          
          console.log(err)
          };
        }
    
      
        
    console.log(data)
    console.log(empty,urlValue,urlValue === '')
    if(urlValue  === ''){
      seterr(false);
    }
    };
    console.log(data,data?.data.video.keywords)
    // https://www.youtube.com/watch?v=bPY_YSH0B0c
return (
<div className="main">
    <div className="card keyflex">
    <div className="titlekey">
      <h2 style={{fontSize: "260%", color:"#ffffff", textShadow: '0 0 4px black,0 0 5px black, 0 0 6px black, 0 0 5px black'}}>Keywords</h2>
      {data === null  ?
      <span className="handle" style={{  fontWeight: '800',fontSize: 'x-large', color:'rgba(217, 4, 41, 1)'}}>{loader=== true ? "Loading...": err === true? <span style={{color:'rgba(217, 4, 41, 1)'}}>Wrong Url</span>: empty === true?"Field Empty":""}</span>
      : typeof data?.data.video.keywords ==='undefined' ?
      <span className="handle" style={{  fontWeight: '800',fontSize: 'x-large', color:'rgba(217, 4, 41, 1)'}}>Keyword's Empty</span>
      :<>
      <div className="words">
        {data?.data.video.keywords?.map((e,i)=>(
          <span key={i}>{e}</span>
        ))}
      </div> 
      <button onClick={()=>{
navigator.clipboard.writeText(data?.data.video?.keywords)
      }} style={{width: '94%', padding: '10px', marginTop:'5px', border:'0',color:'white',background:'rgba(217, 4, 41, 1)',borderRadius:'4px'}}>Copy</button>
      </>
    }
      
        

    </div>
    <div className='entry key'>
        <h2>Keywords...</h2>
        <p>Get Any Youtube Video Keywords</p>
        <div className='inpcon'>
        <div>
        <input type='text' ref={value} value={urlValue} onChange={(e) => setUrlValue(e.target.value)}/>
            <button onClick={Paste}> <img src='./svg/paste.svg' /></button>
        </div>
        <button onClick={handleConvert}>Convert</button>
        </div>
    </div>
    </div>
</div>
)
}
export default Keyword;
