
import {  useEffect, useState } from "react"
import {users } from "../../../api/api"


import './users.css'
import Button from 'react-bootstrap/Button';
import { NavLink } from "react-router-dom";
import { Axios } from "../../../api/axios";
import Image from 'react-bootstrap/Image';
import Tdata from "../dashboardcomp/table";

export default function Users(){
    const [users1,setusers]=useState([]);
    const [user,setuser]=useState('');

    const [Loading,setloading]=useState(false);
    const [delete2,setdelete]=useState(0)

    useEffect(()=>{

     setloading(true);
    async function fetchdata() {
      Axios.get('/user').then(data=>setuser(data.data)).catch(err=>console.log(err)).then(()=>{

        Axios.get('/'+users).then(data=>setusers(data.data)).then(()=>setloading(false)).catch(err=>console.log(err))
      })
     }
     fetchdata();
    },[delete2])

    const filteredusers = users1.filter(el=>el.id!==user.id)
const headerdata= [

  {  id:'name',
    name:'Name'
  },
  { id:'email',
    name:'Email'
  },
  {id:'role',
    name:'Role'
  }
]; return (
 <div  style={{overflow:'scroll'}} className="usersshow" >
           <div style={{
            marginLeft:'30px',
            marginBottom:'40px'
           }}>
           <h1 style={{
                 color:'#29a5f7',
                 fontSize:'40px',
                 marginBottom:'30px'
               }} >  Welcome Admin</h1>
               <div style={{display:'flex',gap:'15px'}}>
                <Image  style={{height:'71px',width:'70px'}}  src={require('./favicon.ico')} roundedCircle /> <div><h4>{Loading?'loading..':user.name}</h4><p style={{color:'gray'}}>You can add , edit and delete users here</p></div></div></div>


               <div>
               <NavLink to='/dashboard/user'>  <Button>Add New User</Button></NavLink>
               <NavLink style={{textDecoration:'none'}} to={`${user.id}`}>  <Button>Edit Your user</Button></NavLink>

                <hr></hr>
                <Tdata header={headerdata} data={filteredusers} loading={Loading} type={'user'} handle={setdelete}></Tdata>

</div>
        </div>


  )
}