'use client';
import { useState } from "react";
import SignUpForm from "../forms/SignUp";
import Link from "next/link";

export default function NotLoggedSidebar({username,likes}){
    const [open,setOpen]=useState("");
    return(
        <div className="sidebar">
            <div className="top">
                <Link href={"/"+username}>{username}</Link> <p>is using F1BoxBox to share race reviews and lists with friends.</p>
                <p onClick={()=>setOpen("signup")}>Join Here</p>
            </div>
            <div className="second">
                <p>Sign in to create lists</p>
            </div>
            <div className="likes">
                <p>{likes} likes</p>
            </div>
            <div className="share">
                <p>share</p>
            </div>
            {open === 'signup' && <div className="modal"><SignUpForm setOpen={setOpen}/></div>}
        </div>
    )
    
}