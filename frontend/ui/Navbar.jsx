'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import SignInForm from "./forms/SignIn";
import SignUpForm from "./forms/SignUp";
import styles from "./navbar.module.css";
import { CloudLightningIcon } from "lucide-react";
import Logout from "./buttons/Logout";

export default function Navbar({username}){
    const [open,setOpen] = useState('');
    const [islogged,setIsLogged] = useState(username);
    
    return(
        <>
            <nav className={styles.navbar}>
                <div className={styles.left}>
                    <Link href="/">F1BoxBox</Link>
                </div>
                <div className={styles.right}>
                    {open === 'signin' && <SignInForm setOpen={setOpen}/>}
                    {
                        open !== 'signin' && islogged==="" &&
                        <>
                            <button type="button" onClick={()=>setOpen('signin')}> sign in</button>
                            <button type="button" onClick={()=>setOpen('register')}> Create account</button>
                            <Link href="/races">Races</Link>
                            <Link href="/races/2024">Seasons</Link>
                            <Link href="/">Members</Link>
                            <Link href="/">Journal</Link>
                        </>
                    }
                    {
                        open !== 'signin' && islogged!=="" && 
                        <>
                            <button type="button"> {islogged}</button>
                            <CloudLightningIcon/>
                            <Link href={"/"+username+"/lists"}>Lists</Link>
                            <Link href="/races/2024">Seasons</Link>
                            <Link href="/">Members</Link>
                            <Link href="/">Journal</Link>
                            <Logout setIsLogged={setIsLogged}/>
                        </>
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