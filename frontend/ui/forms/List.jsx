'use client';
import { useEffect, useRef, useState } from "react"
import SubmitButton from "../buttons/SubmitButton";
import AddRace from "../lists/addRace";
import styles from "@/app/[username]/lists/list.module.css";

export default function ListForm({races,listData = null}){
    const formRef = useRef(null);
    const [selectedIds, setSelectedIds] = useState(listData ? listData.races : []);
    const [error,setError] = useState("");
    const [checked,setChecked] = useState(false);
    useEffect(() => {
        if (listData) {
            setChecked(listData.ranked);
        }
    }, [listData]);

    
    const handleSubmit = async(e)=>{
        e.preventDefault();
        let res;
        if(selectedIds.length === 0){
            setError("You must select at least one race to create the list");
            return;
        }

        const formData = new FormData(formRef.current);
        
        if(listData){
            res = await fetch("/api/lists/edit/"+listData.id,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({name:formData.get("name"), privacy:formData.get("privacy"), 
                ranked:checked, desc:formData.get("desc"), races:selectedIds})
        });
        }
        else{            
            res = await fetch("/api/lists/new",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({name:formData.get("name"), privacy:formData.get("privacy"), 
                ranked:formData.has("ranked"), desc:formData.get("desc"), races:selectedIds})
        });
        }       
        if(res.ok){
            setError("");
            formRef.current.reset();
            setSelectedIds([]);
        }
        else{
            const json = await res.json();
            setError(json.message);
        }
    }
    return(
        <>
            <form ref={formRef} onSubmit={handleSubmit} action="" className={styles.form}>
                <div className={styles.left}>
                    <div className={styles["form-item"]}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" id="name" defaultValue={ listData ? listData.name : null} required/>
                    </div>
                    <div className={styles["form-item"]}>
                        <label htmlFor="privacy">Privacy - Who can view this list?</label>
                        <select name="privacy" id="privacy">
                            <option value="public">Everyone</option>
                            <option value="private">Just Me</option>
                        </select>
                    </div>
                    <div className={styles["form-item-check"]}>
                        <div>
                            <label htmlFor="ranked">Ranked List</label>
                            <input type="checkbox" name="ranked" id="ranked" checked={checked} onChange={(e)=>setChecked(e.target.checked)}/>
                        </div>
                        <p>Show position for each race</p>                
                    </div>
                </div>                
                <div className={styles.right}>
                    <div className={styles["form-item"]}>
                        <label htmlFor="desc">Description</label>
                        <textarea name="desc" id="desc" rows={10} cols={10} defaultValue={listData ? listData.description: null}></textarea>
                    </div>
                    <div className={styles.bottom}>
                        <div className={styles.buttons}>
                            <button type="button" id={styles.delete}>Cancel</button>
                            <SubmitButton text={ listData ? "Edit" : "Save"}/>
                        </div>
                        <div className ={styles.errors}>
                            <p className={styles.error}>{error || error.message}</p>
                        </div>                    
                    </div>  
                </div>                                      
            </form>
            <AddRace races={races} selectedIds={selectedIds} setSelectedIds={setSelectedIds} ranked={checked} />
        </>
        
    )
}