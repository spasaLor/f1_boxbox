'use client';

import { useRef } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import styles from "@/app/settings/settings.module.css";

export default function SettingsForm({data=null}){
    const formRef = useRef(null);
    const nav = useRouter();
    const username = Cookies.get('username');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const res = await fetch("/api/user",{
            method:'PUT',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({name: formData.get("name"),surname:formData.get("surname"), email: formData.get("mail"), 
                location:formData.get("location"), website:formData.get("web"), bio:formData.get("bio")
            })
        });
        if(res.ok){
            nav.push("/"+username);
        }            
    }

    return(
        <form onSubmit={handleSubmit} ref={formRef}>
            <div className={styles["form-item-split"]}>
                <div className="">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" id="name" defaultValue={data?.name}/>
                </div>
                <div className="">
                    <label htmlFor="surname">Surname</label>
                    <input type="text" name="surname" id="name" defaultValue={data?.surname}/>
                </div>
            </div>
            <div className={styles["form-item"]}>
                <label htmlFor="mail">E-mail address</label>
                <input type="text" name="mail" id="mail" defaultValue={data?.email}/>
            </div>
            <div className={styles["form-item-split"]}>
                <div className="">
                    <label htmlFor="location">Location</label>
                    <input type="text" name="location" id="location" defaultValue={data?.location}/>
                </div>
                <div className="">
                    <label htmlFor="web">Website</label>
                    <input type="text" name="web" id="web" defaultValue={data?.website}/>
                </div>
            
            </div>
            <div className={styles["form-item"]}>
                <label htmlFor="bio">Bio</label>
                <textarea name="bio" id="bio" defaultValue={data?.bio}></textarea>
            </div>
            <SubmitButton text={"Save changes"}/>
        </form>
    )
}