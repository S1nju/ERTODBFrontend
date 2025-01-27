import { useState } from "react"
import axios from 'axios'
import { baseurl,login } from "../../../api/api"
import './auth.css'
import { Link } from "react-router-dom"
import Loading from "../../loading/loading"
import Cookie from 'cookie-universal'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react'

export default  function Login(){
const [form,setform]=useState({

    email:'',
    password:'',
})
const[errtxt,seterrtxt]=useState('');
const [loading,setloading]=useState(false);
const [loading2,setloading2]=useState(false);
const [show,setshow]=useState(true)


const cookie = Cookie();

function check(e){


    setform({...form,[e.target.name]:e.target.value})
}

async function submit(e){
    e.preventDefault();
    setloading(true)
try {
    let res=

    await axios.post(baseurl+'/auth/'+login,form)
    if(res.status===200){
        window.location.pathname='/'
        setloading(false)

        const token = res.data;
        console.log(token);
        cookie.set('token',token)
    }else{

        seterrtxt('Invalid Email Or password');
    }


} catch (error) {
   console.log(error);
   seterrtxt('Invalid Email Or password');
   setloading(false)
   setshow(true)

}


}



return(<div className="allparent">


    <div className="registerformparent">
    {errtxt!==''&&     <Alert show={show} style={{position:'absolute',bottom:'25px'}} key={'danger'} variant={'danger'}>
       <i className="fa-regular fa-circle-xmark"></i>  {errtxt}   <Button onClick={() => setshow(false)} variant="outline-sucsses">
       <i className="fa-solid fa-xmark"></i>
          </Button> </Alert>}


<h2>Welcome Back</h2>
<p className="textw">Log in  using email and password</p>
<hr></hr>
<hr></hr>

<Form onSubmit={submit}>
<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="name@example.com"  name="email"  value={form.email}  onChange={check} 
        required />
      </Form.Group>

  <Form.Group className="mb-3" controlId="formPlaintextPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password"  name="password"  value={form.password} onChange={check}   required minLength='8'/>
      </Form.Group>

    <Button  onClick={submit} style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        gap:'10%',
        width:'100%'

    }}>{(loading)? <><Loading></Loading></>:<span>Login</span>}</Button>
    <hr></hr>
    <Button onClick={()=>  setloading2(true)} style={{

       width:'100%'
    }}><a style={{ display:'flex',
    justifyContent:'center',
    alignItems:'center',
    gap:'10%',textDecoration:'none',color:'white'}} href="http://127.0.0.1:8000/login-google">{(loading2)? <><Loading></Loading></>:<><i className="fa-brands fa-google-plus"></i></>}Login with google</a></Button>


</Form>
<p>Or you are new with us <Link to='/signup' ><b>Register</b></Link></p>

</div>
<div className="lphoto"></div>
</div>)


}