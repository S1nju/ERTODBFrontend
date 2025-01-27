import { Navigate, Outlet } from "react-router-dom";
import Cookie from 'cookie-universal'
import { useEffect, useState } from "react";

import { user } from "../../../api/api";
import Loading from "../../loading/loading";
import { Axios } from "../../../api/axios";
import Err403 from "./403";

export default function Rauth({allowedRole}){
    const [u,setu]=useState('');


    const cookie = Cookie();
    useEffect(()=>{
        try {
             Axios.get('/auth/'+user).then(d=>{setu(d)
             })
        } catch (e) { console.log(e)
            window.location.pathname='/ertodb/login'
        }
    },[])
    return(cookie.get('token')?( u===''? <Loading></Loading>:  ( u.data.authorities.filter((authority,i) => { return authority.authority === allowedRole[i]})? <Outlet></Outlet> :  <Err403></Err403>) ):<Navigate to='/login' replace={true}></Navigate>)
}