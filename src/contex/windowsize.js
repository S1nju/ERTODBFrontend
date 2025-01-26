import { createContext, useEffect, useState } from "react";
export const windows1 = createContext('');
export default function Wsize({children}){
 
    const[windows,setwindow]=useState(window.innerWidth)
    useEffect(()=>{
        function resize(){
            setwindow(window.innerWidth)
}
window.addEventListener('resize',resize)
return ()=>{
    window.removeEventListener('resize',resize)
}}

        
    ,[])
   

    return(
        <windows1.Provider value={windows}>{children}</windows1.Provider>
    )
}