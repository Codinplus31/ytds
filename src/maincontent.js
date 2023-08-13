import React, {useState, useEffect, useRef } from "react";
import io  from 'socket.io-client';
import { CopyToClipboard } from "react-copy-to-clipboard";
import Peer from "simple-peer";
// import axios from 'axios';
import {useHistory} from  'react-router-dom';
import "./styles.css";
function MainC(){
    let mdtitle = [['Downloader','rgba(217, 4, 41, 0.3)','svg/youtube.svg'], ['Thumbnail','rgba(0, 166, 251,0.3)','svg/image5.svg'], ['Keywords','rgba(0, 245, 212, 0.3)','svg/key.svg']];
    let click = useRef();
    let history = useHistory();
    useEffect(()=>{
      click.current.children[0].onclick = ()=>{
        console.log('done')
        history.push('/Downloader');
      }
      click.current.children[1].onclick = ()=>{
        console.log('done')
        history.push('/Thumbnail');
      }
      click.current.children[2].onclick = ()=>{
        console.log('done')
        history.push('/Keywords');
      }
    },[click])

    

    {/* <div className="header">
   <h1>QK/SHARE</h1>
   </div> */}

    return (
    <div ref={click}  className="content">
      {mdtitle && mdtitle.map((e,r)=>(
    <div className='media' key={r}>
      <h3>{e[0]}</h3>
      <div style={{background: e[1]}}>
        <img src={e[2]} />
      </div>
      </div>))}


    </div>)
}

export default MainC;