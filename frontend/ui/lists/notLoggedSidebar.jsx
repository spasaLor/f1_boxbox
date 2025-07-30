'use client';
import { useState } from "react";
import SignUpForm from "../forms/SignUp";
import Link from "next/link";
import styles from './lists.module.css';

export default function NotLoggedSidebar({username,likes}){
    const [open,setOpen]=useState("");
    return(
        <>
            <div className={styles.sidebar}>
                <div className={styles.first}>
                    <p><Link href={"/"+username}>{username}</Link> is using F1BoxBox to share race reviews and lists with friends.</p>
                </div>
                <div className={styles.join}>
                    <p onClick={()=>setOpen("signup")}>Join Here</p>
                </div>
                <div className={styles.second}>
                    <p>Sign in to create lists</p>
                </div>
                {likes >0 && <div className={styles.likes}>
                    <p>{likes} {likes === 1 ? 'like' : 'likes'}</p>
                </div>}
                <div className={styles.share}>
                    <p>Share</p>
                </div>
            </div>
            {open === 'signup' && <div className={styles.modal}><SignUpForm setOpen={setOpen}/></div>}
        </>
    )    
}