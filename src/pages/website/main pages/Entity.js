import React from 'react'
import {  Handle,Position } from '@xyflow/react'
import './App.css'

let colors=["#007BFF","#28A745","#FD7E14","#6F42C1"]
    
let x = Math.floor(Math.random() * colors.length)

export default function Entity({data}) {


  return (<div className='table'>
  
        <div className='tabletitle' style={{backgroundColor:colors[x]}}><p>{data.title}</p></div>
        

<div className='tablecontent'>
    
    <Handle className='handle' type="source" position={Position.Left}> </Handle><p style={{color:"black"}}>{data.pkey.name}
        </p><p style={{opacity:0.8, color:"black"}}>{data.pkey.type}   (pkey)</p>
    <Handle type="target" position={Position.Right}></Handle></div>

<hr style={{margin:0}}></hr>
{data.attribuetes.map((item,index)=>{
return <div key={index}><div  className='tablecontent'><p>{item.name}</p><p style={{opacity:0.8}}>{item.type}</p></div>
<hr style={{margin:0}}></hr></div>
})

}   
    </div>
  )
}
