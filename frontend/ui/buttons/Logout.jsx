'use client'
import { useRouter } from "next/navigation";

export default function Logout({setIsLogged}){
    const nav = useRouter();
    const logout = async()=>{
        const res = await fetch("/api/logout");
        const json=await res.json();
        setIsLogged('');
        nav.push(json.redirect);
    }
    return(
        <button type="button" onClick={logout}>Logout</button>
    )
}