import React, {useState, useEffect, useRef} from "react";
import axios from 'axios';

function Thumb(){
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
console.log(navigator.onLine, 'online',urlValue )
    try{

      const data = await axios.get(
      `http://localhost:4000/download?url=${urlValue}`)
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

      if(urlValue  === ''){
        seterr(false);
      }
    
console.log(data)

};
  setTimeout(()=>{
        if(err === true){
        seterr(false)
      }
        if(empty === true){
        setempty(false)
      }
  },3000)
console.log(data)

return (
<div className="thumbgrid">
    <div className='entry thumbentry'>
        <h2>Thumbnail Downloader</h2>
        <p>Download Youtube Video Thumbnail </p>
        <div className='inpcon'>
        <div>
        <input type='text' ref={value} value={urlValue} onChange={(e) => setUrlValue(e.target.value)}/>
            <button onClick={Paste}> <img src='./svg/paste.svg' /></button>
        </div>
        <button onClick={handleConvert}>Convert</button>
        </div>
    </div>
    
    {data !== null ? 

        data?.data.thumb.map((e,i)=>(
            <div title={e.height+'p'} key={i}>

            <img src={e.url} />
            <div className="thumbbutton">
                <button><a href={e.url} target="_blank">View</a></button>
                <button onClick={()=>{
                    let link = document.createElement('a');
                    link.href = e.url;
                    link.download = "ytds - " + data?.data.video.title;
                    link.click();  
                  // let link =  React.createElement('a',{href: e.url, download:`ytds - ${data?.data.video.title}`},'')
                  
                }}>
                  Download
                  {/* <a href={e.url} download={'ytds - ' + data?.data.video.title}>Download</a> */}
                  </button>
                </div>
            </div>
            
))


:(
    <div style={{
        pointerEvents:'none',
        width:'100%',
        height: '51.6vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // border: '1px solid blue'
    }}>
        <div className="image">
            <img src={loader === true ? "./Spinner-2.gif":"svg/image5.svg"}  />
            <p>{loader=== true ? "Loading...": err === true? <span style={{color:'rgba(217, 4, 41, 1)'}}>Wrong Url</span>: empty === true?<span style={{color:'rgba(217, 4, 41, 1)'}}>Field Empty</span> :"Your image will display here..."}</p>
        </div>
    </div>
)
}

</div>

)

}

export default Thumb;