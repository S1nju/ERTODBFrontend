import { useContext, useEffect, useState } from "react";
import { menu } from "../../../contex/hamburger";

import { windows1 } from "../../../contex/windowsize";
import {logout } from "../../../api/api"

import { Axios } from "../../../api/axios";
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Cookie from 'cookie-universal'
import Button from '@mui/material/Button';

export default function TTopbar() {
  const menu2 = useContext(menu)
 
  
 const wsize =useContext(windows1);
 const[user,setuser]=useState('')
 const[usermobile,setusermobile]=useState(false);

 useEffect(()=>{


     Axios.get('/user').then(data=>setuser(data.data)).catch(err=>console.log(err))









 },[])

function hamberger(){
  menu2.setopen(prev=>!prev);
}
async function hlogout(){
  const cookie = Cookie();
  try {



     await Axios.get('/'+logout).then(()=>cookie.remove('token'))
     window.location.pathname='/login'

  } catch (error) {
      console.log(error);


  }}



  return (<div className="topbar">
  
    <div style={{display:'flex',gap:'25px',alignItems:'center', width:(wsize<700)?'100%':'30%',justifyContent:(wsize<700)?'space-between':''} }><h2>Sobs-Store</h2>

<div  style={{ display:'flex',gap:'35px',alignItems:'center'}}>
  <div   style={{ display:(wsize>700)?'none':'block'}}>
  <Image onClick={()=>setusermobile((prev)=>!prev)}  style={{height:'41px',width:'40px'}}  src={require('./favicon.ico')} roundedCircle />
  <Card border="primary" style={{ width: '10rem',display:(!usermobile)?'none':'block',position:'absolute',right:'60px',textAlign:'center' }}  >
        <Card.Header><strong> {user.name}</strong></Card.Header>
        <Card.Body>
          <Card.Title>You are an admin</Card.Title>

        </Card.Body>
      </Card></div>


    <i onClick={hamberger} className="fa-solid fa-bars" style={{scale:'1.5'}}></i></div></div>


    <div style={{display:(wsize<700)?'none':'flex',gap:'35px'}}>

    <div style={{ display:'flex',gap:'15px'}}>
        <div style={{display:(wsize<700)?'none':'block'}}><h6>{user.name}</h6><span style={{fontSize:'15px'}}>{user.role==='1995'?'Admin':user.role==='2001'?'User':'Writer'}</span></div>
     <Image  style={{height:'41px',width:'40px'}}  src={require('./favicon.ico')} roundedCircle />

     </div>

    <Button variant="danger" style={{height:'41px'}} onClick={hlogout}>Log Out</Button></div>
  </div>

  );
}
