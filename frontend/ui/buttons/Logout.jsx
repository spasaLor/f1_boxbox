'use client'
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Logout({setIsLogged}){
    const nav = useRouter();
    const cookieStore = Cookies;
    const logout = async()=>{
        const res = await fetch("/api/logout");
        const json=await res.json();
        cookieStore.remove('username');
        setIsLogged('');
        nav.push(json.redirect);
    }
    return(
        <button type="button" onClick={logout}>Logout</button>
    )
}