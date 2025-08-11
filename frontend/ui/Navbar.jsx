'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import SignInForm from "./forms/SignIn";
import SignUpForm from "./forms/SignUp";
import styles from "./navbar.module.css";
import { CloudLightningIcon } from "lucide-react";
import Logout from "./buttons/Logout";
import Cookies from "js-cookie";

export default function Navbar(){
    const [open,setOpen] = useState('');
    const [islogged,setIsLogged] = useState(false);
    const username = Cookies.get('username');

    useEffect(()=>{
        const user = Cookies.get('username');
        if(user)
            setIsLogged(!!user)
    },[])
    
    return(
        <>
            <nav className={styles.navbar}>
                <div className={styles.left}>
                    <Link href="/">F1BoxBox</Link>
                </div>
                <div className={styles.right}>
                    {open === 'signin' && <SignInForm setOpen={setOpen} onLoginSuccess={()=>setIsLogged(true)}/>}

                    {open !== 'signin' &&
                        (islogged ? 
                        <>
                            <Link href={"/"+username}>{username}</Link>
                            <Link href={"/lists"}>Lists</Link>
                            <Link href="/races/2024">Seasons</Link>
                            <Link href={"/"+username+"/activity/friends"}>Activity</Link>
                            <Logout setIsLogged={setIsLogged}/>
                        </>
                        :
                        <>
                            <button type="button" onClick={()=>setOpen('signin')}> sign in</button>
                            <button type="button" onClick={()=>setOpen('register')}> Create account</button>
                            <Link href="/lists">Lists</Link>
                            <Link href="/races/2024">Seasons</Link>
                        </>)
                    }              
                </div>
            </nav>
            { 
                open === 'register' && 
                <div className={styles.modal}>
                    <SignUpForm setOpen={setOpen}/>
                </div>
            }
        </>
        
    )
}