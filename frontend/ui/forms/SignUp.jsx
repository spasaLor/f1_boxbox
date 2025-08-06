'use client';
import { useRef, useState } from "react";
import SubmitButton from "../buttons/SubmitButton";
import { useRouter } from "next/navigation";
import styles from "../navbar.module.css";

export default function SignUpForm({setOpen}){
    const formRef=useRef(null);
    const [error,setError] = useState();
    const nav = useRouter()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        const formData = new FormData(formRef.current);
        if(!formData.has("terms")){
            setError([{message:"You need to be at least 16 to register"}]);
            return;
        }
        if(!formData.has("privacy")){
            setError([{message:"You must to accept the privacy policy to continue"}]);
            return;
        }

        const res = await fetch("/api/register",{method:'POST',headers:{'Content-type':'application/json'},
            body: JSON.stringify({email:formData.get("email"),username:formData.get("username"),password:formData.get("password")})
        });
        const json = await res.json();
        if(!res.ok)
            setError(json.errors);
        else{
            setOpen("");
            nav.push("/welcome");
        }
            
    }
    return(
        <>
            <div className={styles["register-form-container"]}>
                <form action="" ref={formRef} onSubmit={handleSubmit}>
                    <div className={styles["top-line"]}>
                        <p>Join F1BoxBox</p>
                        <p onClick={()=>setOpen('')}>X</p>
                    </div>
                    {error && 
                        <div className={styles["register-error-box"]}>{
                            error.length>0 && 
                            error.map((item,id)=>(<p key={id} className={styles.error}>{item.message}</p>)) 
                        }</div>
                    }
                    <div className={styles["form-item"]}>
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" required/>
                    </div>
                    <div className={styles["form-item"]}>
                        <label htmlFor="username">Username</label>
                        <input type="text" name="username" required/>
                    </div>
                    <div className={styles["form-item"]}>
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" required/>
                    </div>
                    <div className={styles["form-item-check"]}>
                        <input type="checkbox" name="terms"/>
                        <label htmlFor="terms">I'm at least 16 years old and accept the Terms of Use.</label>
                    </div>
                    <div className={styles["form-item-check"]}>
                        <input type="checkbox" name="privacy"/>
                        <label htmlFor="privacy">I accept the privacy policy and consent to the processing of my prsonal information accordance with it.</label>
                    </div>
                    <SubmitButton text={"Sign up"}/>
                </form>
            </div>
       </>
    );

}