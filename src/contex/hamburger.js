import { createContext, useState } from "react";
export const menu = createContext('');
export default function Hamberger({children}){
 
    const[isopen,setopen]=useState(true)

    return(
        <menu.Provider value={{isopen,setopen}}>{children}</menu.Provider>
    )
}