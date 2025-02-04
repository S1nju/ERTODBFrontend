import React, { useContext } from 'react'
import {  Handle,Position } from '@xyflow/react'
import './App.css'
import { menu } from '../../../contex/hamburger'

let colors=["#007BFF","#28A745","#FD7E14","#6F42C1"]
    
let x = Math.floor(Math.random() * colors.length)

export default function Entity({data}) {
  let {darklight , setdark}= useContext(menu);


  return (<div className='table'>
  
        <div className='tabletitle' style={{backgroundColor:darklight?'#3C3D37':colors[x]}}><p>{data.title}</p></div>
        

<div className='tablecontent' style={{backgroundColor:darklight?'#272727':'#fff'}}>
    
    <Handle className='handle' type="source" position={Position.Left}> </Handle><p style={{color:"black"}}>{data.pkey.name}
        </p><p style={{opacity:0.8, color:darklight?"white":"black"}}>{data.pkey.type}   (pkey)</p>
    <Handle type="target" position={Position.Right}></Handle></div>

<hr style={{margin:0}}></hr>
{data.attribuetes.map((item,index)=>{
return <div key={index}><div  className='tablecontent' style={{backgroundColor:darklight?'#272727':'#fff'}}><p>{item.name}</p><p style={{opacity:0.8}}>{item.type}</p></div>
<hr style={{margin:0}}></hr></div>
})

}   
    </div>
  )
}
