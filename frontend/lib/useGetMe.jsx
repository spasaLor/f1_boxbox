'use client';

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function useGetme(){
    const [username,setUsername] = useState("");
    const nav = useRouter();

    useEffect(()=>{
        const user = Cookies.get('username');
        if(!user)
            nav.push("/");
        setUsername(user);
    },[]);
    return{username}
}