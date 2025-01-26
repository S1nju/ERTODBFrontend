import { useContext, useEffect,useState } from "react";
import { NavLink } from "react-router-dom";
import { menu } from "../../../contex/hamburger";
import { windows1 } from "../../../contex/windowsize";

import Button from 'react-bootstrap/Button';
import {logout,user } from "../../../api/api"
import { Axios } from "../../../api/axios";
import Cookie from 'cookie-universal'
import { links } from "./linkssidebar";

export default function Sidebar(){
    const wsize = useContext(windows1);

const menu2 = useContext(menu)
const open = menu2.isopen;

const [u,setu]=useState('');



useEffect(()=>{
async function fetchdata(){
    try {
 await Axios.get('/'+user).then((d)=>{setu(d.data);
})






   } catch (e) { console.log(e)

       window.location.pathname='/login'

   }




}


fetchdata();

},[])

async function hlogout(){
    const cookie=Cookie()
    try {



       await Axios.get('/'+logout).then(()=>cookie.remove('token'))
       window.location.pathname='/login'

    } catch (error) {
        console.log(error);

    }}


const sidebaritems = links.map((item,key)=> { return(
    item.allowedfor.includes(u.role)?
    <div key={key} style={{display:'flex',alignItems:'flex-start'}}>
    <NavLink to={item.to} style={item.linkstyle}><i className={item.iconclassname}></i><p style={{

display: (wsize>700)? (open? 'block':'none'):'none',

margin:'0',


}}>{item.pcontent}</p></NavLink></div>

    :item.allowedfor.includes(u.role)?<div style={{display:'flex',alignItems:'flex-start'}}>
    <NavLink to='write' style={{display:'flex', gap:'20px',justifyContent:'center',alignItems:'center'}}><i className="fa-solid fa-cart-plus"></i><p style={{
    display: (wsize>700)? (open? 'block':'none'):'none',
    marginBottom:'0'
    }}>Write</p></NavLink></div>:'')

})

    return(
    <>



    <div className="sidebar"  style={{position:(wsize<700)?'absolute':'relative', display:'flex', translate:(wsize<700)? ((!open)? '-500px':''):'',transition:'0.2s' ,width:'fit-content'}}>

    {sidebaritems}


    <Button onClick={()=>   window.location.pathname='/'}  style={{display:(wsize<700)?'block':'none',gap:'5px'}} variant="primary"><i className="fa-solid fa-store"></i></Button>

    <Button onClick={hlogout} style={{display:(wsize<700)?'block':'none',gap:'5px'}}  variant="danger"><i className="fa-solid fa-arrow-right-from-bracket"></i></Button>
    </div>
    <div style={{
        display:(wsize<700)? (open? 'block':'none'):'none',
position:'absolute',
width:'100%',
height:'100vh',
backgroundColor:'rgba(0,0,0,0.2)',
zIndex:'1'

    }}></div>
     </>
     )
}