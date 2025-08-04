'use client';
import { useRef, useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import styles from "../navbar.module.css";
import { useRouter } from "next/navigation";

export default function SignInForm({setOpen,onLoginSuccess}){
    const formRef=useRef(null);
    const [error,setError] = useState();
    const nav=useRouter();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(formRef.current);
        const res = await fetch("/api/login",{method:'POST',headers:{'Content-type':'application/json'},
            body: JSON.stringify({username:formData.get("username"),password:formData.get("password")}),
        });
        const json = await res.json();
        if(!res.ok)
            setError(json.error);
        else{
            setOpen('');
            nav.refresh();
            if(onLoginSuccess)
                onLoginSuccess()
        }            
    }
    
    return(
        <>
            <div className={styles["login-form-container"]}>
                <form ref={formRef} onSubmit={handleSubmit}>
                    <div className={styles["form-item"]} onClick={()=>setOpen('')}>
                        <p>X</p>
                    </div>
                    <div className={styles["form-item"]}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" required autoFocus/>
                    </div>
                    <div className={styles["form-item"]}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password"required/>
                    </div>
                    <div className={styles["button-wrapper"]}>
                        <SubmitButton text={"Log in"}/>
                    </div>
                </form>
            </div>
            <div className={`${styles["error-box"]} ${error ? styles["active"] : ""}`}>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        </>
        
    );
}