import React from 'react';
import { useState, useCallback, useMemo,useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import Entity from './Entity';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Edge from './Edge.js'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import './App.css'
import { Axios } from '../../../api/axios.js';
import { IconButton } from '@mui/material';



 

 
export default function Reactflow() {
  let id =  window.location.pathname.split('/');
  let number = id[id.length - 1];
  const nodetype = useMemo(()=>({entitytable:Entity}),[])
  let initialNodes = []; 
  let initialEdges = [];
  const [nodes, setNodes] = useState(initialNodes); 
  const [edges, setEdges] = useState(initialEdges);
  const [isopen, setopen] = useState(false);
  useEffect(()=>{
    const s = async (params) => {
      try {
        let res = await Axios.get('/db/db?id='+number)
  
        if(res.data.id==null){
          window.location.pathname='/dashboard/dbs'
        }
      
       
        let tab= res.data.tables.map((i,k)=>{
  let obj ={
    id: ""+k,
    position: { x: (Math.random()*300), y: (Math.random()*200) },
    data:{
        title:i.name,
        pkey:{name:i.pkey,type:i.type},
        attribuetes:i.columns
            },
     type:"entitytable"
  }
  return obj
        })
   
     setNodes(tab)
     let edg = res.data.tables.flatMap((i, k) =>
      i.relationto.map((targetId) => ({
        id: `e${k}-${targetId}`,
        source: k.toString(), // Ensure the source is the node's actual ID (assume `i.id` exists)
        target: targetId.toString(), // Ensure target ID is a string
        type: 'custom-edge', // Add edge type (adjust based on your React Flow needs)
        animated: true, // Enable animation
      }))
    );
             setEdges(edg)
             console.log(edg)
      } catch (e) { console.log(e)
  
      
      }
  
  }
    s();
  },[])
  const [navopen, setnavopen] = useState(false);
  const [forupdate, setforupdate] = useState(false);
  const [EntityForm,setEntityForm] =useState({
name:"",type:"",title:"",id:""
  });
  
const edgeTypes = {
  'custom-edge': Edge
}
  const [attr,setattr] =useState([]);
  const onConnect = useCallback(
    (params) => {const edge = { ...params, type: 'custom-edge',animated:true };
      return setEdges((eds) => addEdge(edge, eds))},
    [],
  );

  const onNodesChange = useCallback(
    (changes) => {
      return setNodes((nds) => applyNodeChanges(changes, nds))},
    [],
  );
  const onEdgesChange = useCallback(
    (changes) => {
      return setEdges((eds) => applyEdgeChanges(changes, eds))},
    [],
  );
  const [textfileds,settextfileds]=useState([]);
  let addtextfiled = function(){
    textfileds.at(0)
   setattr([...attr,{name:"",type:""}])
  
        
      

  }
     const handlenodeupdate =(e,node)=>{
      setnavopen(true)
      setforupdate(true)
      let uvv=JSON.parse(JSON.stringify(node.data.attribuetes))
   
    uvv.forEach((i,el)=>{
      switch(i.type){
        case "varchar" :
          i.type= 10
          break;
          case "int" :
            i.type= 20
          break;
          case "float" :
            i.type= 30
          break;
          case "list" :
            i.type= 40
          break;
          case"char"  :
            i.type= 50
          break;
          default:
            i.type=""
            break;}})
          
     
  console.log(uvv)
      // Update the nodes state with the modified node
    
     
      let typeval;
      switch(node.data.pkey.type){
        case "varchar" :
          typeval= 10
          break;
          case "int" :
            typeval= 20
          break;
          case"float"  :
          typeval=30 
          break;
          case "list" :
          typeval= 40 
          break;
          case  "char":
          typeval= 50
          break;
          default:
            typeval=""
          
            break;}
    setEntityForm({
      name:node.data.pkey.name,type:typeval,title:node.data.title,id:node.id
    })
    
    setattr(uvv)
    
     }
     const deletenode = (e)=>{
    
        // Remove the node with the specified id
        setNodes((prevNodes) => prevNodes.filter((node) => node.id !== EntityForm.id));
    
        // Remove edges connected to the node
        setEdges((prevEdges) =>
          prevEdges.filter((edge) => edge.source !== EntityForm.id && edge.target !== EntityForm.id)
        );
        setforupdate(false)
      setnavopen(false)
      setEntityForm({name: "", type: "", title: "",id: ""})
      setattr([])
     }
     const updatenode = (e) => {
      let uv=JSON.parse(JSON.stringify(attr))
      uv.forEach((i,el)=>{
       switch(i.type){
         case 10 :
           i.type= "varchar"
           break;
           case 20 :
             i.type= "int"
           break;
           case 30 :
             i.type= "float"
           break;
           case 40 :
             i.type= "list"
           break;
           case 50 :
             i.type= "char"
           break;
           default:
             i.type=""
             setopen(true)
             return;
           
       }
       
     })
     let typeval;
  
     switch(EntityForm.type){
       case 10 :
         typeval= "varchar"
         break;
         case 20 :
           typeval= "int"
         break;
         case 30 :
         typeval= "float"
         break;
         case 40 :
         typeval= "list"
         break;
         case 50 :
         typeval= "char"
         break;
         default:
           typeval=""
           setopen(true)
           return;
           
     }
      
      const updatedNode = {
        id: EntityForm.id,  // Update the node with id '1'
        data:{
            title:EntityForm.title,
            pkey:{name:EntityForm.name,type:typeval},
            attribuetes:uv
                },
      
      };
  
      // Update the nodes state
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === updatedNode.id ? { ...node, ...updatedNode } : node
        )
      );setforupdate(false)
      setnavopen(false)
    };
  const handleChange = (e) => {
  

    setEntityForm((prevState) => ({
        ...prevState
          ,[e.target.name]: e.target.value,
        }
      ));
  };
  const handleChange2 = (e,i) => {
  
    let uv=[...attr];
  

uv[i][e.target.name]=e.target.value;

 console.log(attr);
setattr(uv);

  };
  const save = async() => {
  
    try {
    let res = await Axios.get('/db/db?id='+number)
   if(res.status===200){
    if(res.data.id!=null){
      let db = res.data;

      db.tables= nodes.map((i,k)=>{
        const targetIds = edges
        .filter(edge => edge.source === i.id) // Filter edges with the specified source
        .map(edge => parseInt(edge.target));
        let obj ={
  name: i.data.title,
  pkey: i.data.pkey.name,
  type: i.data.pkey.type,
  columns:i.data.attribuetes,
  relationto: targetIds
        }
                    return obj
    })
     await Axios.put('/db/update',db)

    }
    else{

    }}
      
    } catch (error) {
      
    }

  };
  let addnode = function(ine){
    if(EntityForm.name===""||EntityForm.type===""||EntityForm.title===""){
setopen(true)
    }else {
   let typeval;
  
      switch(EntityForm.type){
        case 10 :
          typeval= "varchar"
          break;
          case 20 :
            typeval= "int"
          break;
          case 30 :
          typeval= "float"
          break;
          case 40 :
          typeval= "list"
          break;
          case 50 :
          typeval= "char"
          break;
          default:
            typeval=""
            setopen(true)
            return;
            
      }
      let uv=[...attr]
     uv.forEach((i,el)=>{
      switch(i.type){
        case 10 :
          i.type= "varchar"
          break;
          case 20 :
            i.type= "int"
          break;
          case 30 :
            i.type= "float"
          break;
          case 40 :
            i.type= "list"
          break;
          case 50 :
            i.type= "char"
          break;
          default:
            i.type=""
            setopen(true)
            return;
          
      }
      
    })
   
    setNodes(e=>{
   
      let arr = [...e,{
        id: ""+(e.length) ,
        position: { x: (Math.random()*300), y: (Math.random()*200) },
        data:{
            title:EntityForm.title,
            pkey:{name:EntityForm.name,type:typeval},
            attribuetes:uv
                },
         type:"entitytable"
    }]
        
 
        setattr([]);
        setEntityForm({
          name:"",type:"",title:""
            });
        return arr
    })
   
  }}
  let deleteattribute = function(i){
    settextfileds(e=>{
         
         return  e.filter((_, index) => index !== i);
    })
    setattr(e=>{
         
      return  e.filter((_, index) => index !== i);
 })

  }
  return (
    <div className='content' style={{ height: '100vh' }}>






      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handlenodeupdate}
        nodeTypes={nodetype}
        edgeTypes={edgeTypes}
    fitView
      > 
        <Background />
        <IconButton onClick={save} sx={{
            position: 'fixed',
            bottom: 100,
            right: 27,
            zIndex:70
          }} >
        <SaveIcon sx={{ fontSize: 20, color: 'black' }} />
  </IconButton>
        <Fab color="primary" aria-label="add"     sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
        }} onClick={()=>setnavopen(true)}>
        <AddIcon />
      </Fab>
       
        <Controls />
      
      </ReactFlow>
      <Drawer open={navopen} 
         sx={{
          width: 300,          // Set fixed width here
          flexShrink: 0,       // Prevent the drawer from shrinking
          '& .MuiDrawer-paper': {
            width: 240,        // Set width of the paper element (the actual drawer)
            boxSizing: 'border-box',
          },
        }}
        onClose={()=>{setnavopen(false);setforupdate(false);setEntityForm({name:"",type:"",title:""});setattr([])}} >
      <div className='navedit'>
     <div style={{display:"flex",justifyContent:"space-between"}}><h4>Entity Editor</h4>  <Button  size="small"   variant="none" color="error" onClick={()=>{setnavopen(false);setforupdate(false);setEntityForm({name:"",type:"",title:""});setattr([])}}>
     <CloseIcon />
          </Button></div>   
      { isopen&& <Alert severity="error" onClose={() => {setopen(false)}}>
        Please Fill all fields with the right inputs
      </Alert>}
        <div>
      <TextField size="small" id="outlined-basic" label="Title" name='title' value={EntityForm.title} onChange={ handleChange} variant="outlined" /></div>
<div
style={{display:'flex',gap:'5px'}}>
  <TextField  id="outlined-basic" size="small" 
  label="PKey" name='name' value={EntityForm.name} 
  onChange={handleChange} variant="outlined" />

<FormControl  fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={EntityForm.type}
          label="Type"
          name='type'
          onChange={handleChange}
          size='small'
        >
          <MenuItem value={10}>Varchar</MenuItem>
          <MenuItem value={20}>int</MenuItem>
          <MenuItem value={30}>float</MenuItem>
          <MenuItem value={40}>list</MenuItem>
          <MenuItem value={50}>char</MenuItem>
        </Select>
      </FormControl>
</div>
{attr.map((i,k)=>
     <div key={k} style={{display:'flex',gap:"10px",width:"100%"}}><TextField  size="small" id="outlined-basic" label="Attribute" name='name' 
        value={i.name}  onChange={(ev) => handleChange2(ev,k)}   variant="outlined" />
        
        <FormControl fullWidth  >
        <InputLabel  id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={i.type}
          label="Type"
          name='type'
          onChange={(ek) => handleChange2(ek,k)} 
          size='small'
          
          
        >
          <MenuItem value={10}>Varchar</MenuItem>
          <MenuItem value={20}>int</MenuItem>
          <MenuItem value={30}>float</MenuItem>
          <MenuItem value={40}>list</MenuItem>
          <MenuItem value={50}>char</MenuItem>
        </Select>
      </FormControl>
        <Button  size="small"  variant="outlined" color="error" onClick={()=>deleteattribute(k)}>
        <CloseIcon />
          </Button></div>
   
)}
<div><Button variant="contained" onClick={addtextfiled}>Add Atrribute</Button></div>
{forupdate?<div style={
  {
    display:"flex",
    gap:"10px",
  }
}><Button sx={{
  width:"50%"
}} variant="contained" onClick={updatenode}>update</Button> 
<Button 
 sx={{
  width:"50%"
}} 
variant="contained" color="error"onClick={deletenode}>Delete</Button></div>:<Button variant="contained" onClick={addnode}>Create Entity</Button>}
    </div>
    
      </Drawer>
    
  
    


    </div>
  );
}