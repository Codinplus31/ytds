import React,  {useState, useRef, useEffect}from 'react';
import axios from 'axios';
function Main() {
  let value = useRef(null);
  let selects = useRef(null);
  function Paste(){
  navigator.clipboard.readText().then(e=>{
    value.current.value = ""+ value.current.value + e;
    setUrlValue(value.current.value)
    
    })
}
const [urlValue, setUrlValue] = useState("");
  const [data, setData] = useState(null);
  const offset = useRef();
  let [loader, setloader] = useState(false);
  let [err, seterr] = useState(false);
  let [index, setindex] = useState(0);
  const handleConvert = async () => {

    setloader(true);
    if(data !== null){
      setData(null);
    }
console.log(navigator.onLine, 'online',urlValue )



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
      }
      console.log(err)
      };
    if(urlValue  === ''){
        seterr(false);
      }

console.log(data)

};
const [qua, setqua] = useState('');
console.log(qua?.container, 'type')
useEffect(()=>{
  setqua(selects.current?.value.toLowerCase());
  console.log(offset.current.offsetHeight)
  console.log(start)
  })
let start = data?.data.info.filter(e=>{
  if ( qua!== 'mp3' && e.container == qua && e.hasVideo === true){
    return e 
  } 
  else if (qua === 'mp3'){
return e.hasVideo  == false && e.hasAudio == true;
  } ;

})
console.log(index, data?.data,'cool')
console.log(loader, 'format', data?.data.info)
let title = data?.data.video.title.slice(0, 34);

const handleFetchData = async () => {
const responseStream = await fetch(start[index]?.url);
      const videoBlob = await responseStream.blob();

      // Create a downloadable link
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(videoBlob);
      downloadLink.download = `${videoTitle}.${start[index]?.container}`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      }


  
return (
// https://www.youtube.com/watch?v=ev3QWo-x6Sc
// https://www.youtube.com/watch?v=pBk4NYhWNMM
<div className="main">
        <div ref={offset} className='card'>
        <div className='logoCon'>
    <img src={data !==null &&  typeof data != 'undefined' ? data?.data.thumb[3].url:'./youtube.png'} className={data !==null &&  typeof data != 'undefined'? 'round':''} style={(data !==null &&  typeof data != 'undefined') ? {transform: 'rotateZ(0deg)'} : {transform: 'rotateZ(-7deg)'}} />
    {err !== false && navigator.onLine === true && urlValue !== '' ? <div>Wrong Url</div> :err !== false && navigator.onLine == false  && urlValue !== '' ? <div>You're Offline</div>: ''}
    {data !==null ?'':urlValue === '' ? <div>Field Empty</div>:''}
    <p>{data?.data.video.ownerChannelName} </p>
        </div>
        {/* https://www.youtube.com/watch?v=ncFTysbddMY  */}
        {data !== null &&  typeof data !== 'undefined'  ? 
      
        (
          <>
      <div className='download'> 
        <h2>{data?.data.video.title.length >= 34 ? title + '...': title}</h2>
        <div>
          <span>VIEW: {data?.data.video.viewCount}</span>
          <span>DURATION: {Math.floor(data?.data.video.lengthSeconds / 60) + ':' + data?.data.video.lengthSeconds % 60}</span>
        </div>
        <div>
          <div>
          <select onChange={(e)=> {
          console.log(e.target.selectedIndex)
          setindex(e.target.selectedIndex);
          }}>
            {start?.map((e,i)=> (

            <option key={i} index={i} onChange={()=>{
            
              
            }}>{e.hasVideo == true ?e.height + 'p': e.audioQuality.split('AUDIO_QUALITY_').join('') } </option>
            ))}
            
          </select>
          </div>
          <div >
          <select ref={selects} onChange={(e)=>{ 
    setqua(e.target.value.toLowerCase());
          }}>
            <option>MP4</option>
            <option>WEBM</option>
            <option>MP3</option>
          </select>
          </div>
        </div>
       <button onClick={handleFetchData}>
          Download
          </button>
          </div>
          <img src='./svg/x.svg' onClick={()=> {
            setData(null)
            setloader(false)
            }} />
          </>
        ) : 
    loader === false  ? (
    <div className='entry'>
        <h1>YouTube Downloader</h1>
        <p>Convert YouTube Video to MP4 or MP3 format </p>
        <div className='inpcon'>
        <div>
             <input type='text' ref={value} value={urlValue} onChange={(e) => setUrlValue(e.target.value)}/>
            <button onClick={Paste}> <img src='./svg/paste.svg' /></button>
        </div>
         <button onClick={handleConvert}>Convert</button>
        </div>
      
        </div>) : 
        (<div className='loading'>
            <img src='./Spinner-2.gif'  />
        </div>) }
        </div>
    </div>
  );
}

export default Main;
