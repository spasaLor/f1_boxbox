'use client';
import Image from "next/image";
import { useState } from "react";
import { useDebouncedCallback } from 'use-debounce';
import styles from "@/app/settings/settings.module.css";

export default function FavoriteRacesSelector(){
    const [open,setOpen]=useState(false);
    const [results,setResults]=useState([]);
    const [favRaces,setFavRaces]=useState([]);
    const [error,setError]=useState("");

    const search = useDebouncedCallback(async (e)=>{
            const toSearch = e.target.value;
            const res = await fetch("/api/races/search",{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body: JSON.stringify({search:toSearch})
            });
            const json= await res.json();
            if (res.ok)
                return setResults(json.races);
            return setError(json.message);
        } 
    ,300);
    
    const setFavorite =async (raceId,cover)=>{
        const res = await fetch("/api/races/favorite",{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({raceId})
        });
        if(res.ok){
            setFavRaces(prev=>[...prev,{id:raceId,cover}])
            setOpen(false);
        }
        else{
            const json= await res.json();
            return setError(json.message);
        }
    }
    const removeFavorite =async (raceId)=>{
        const res = await fetch("/api/races/favorite",{
            method:'DELETE',
            headers:{'Content-type':'application/json'},
            body: JSON.stringify({raceId})
        });
        if (res.ok) {
            setFavRaces(prev =>
                prev.map(item => (item?.id === raceId ? null : item))
            );
        }else{
            const json= await res.json();
            return setError(json.message);
        }
    }
    return(
        <>
            <div className={styles["items-container"]}>
                {Array.from({length:4},(_,i)=>(
                    <div className={styles["fav-item"]} key={i}>
                        {!favRaces[i] ? <p className={styles.addIcon} onClick={()=>setOpen(true)}>+</p> : <div className=""><Image src={favRaces[i].cover} alt="race_cover" height={200} width={100}/> <p className={styles.close} onClick={()=>removeFavorite(favRaces[i].id)}>X</p></div> }
                    </div>
                ))}
            </div>
            {open && <div className={styles.modal}>
                <div className={styles.inner}>
                    <div className={styles["top-row"]}>
                        <label htmlFor="search">Pick a race</label>
                        <p style={{cursor:'pointer'}} onClick={()=>setOpen(false)}>X</p>
                    </div>                    
                    <input type="text" name="search" id="search" onChange={search} autoComplete="off"/>
                    <ul className={styles.results}>
                        {results.map((item)=>(
                            <li key={item.id} onClick={()=>setFavorite(item.id,item.cover)}>
                                <p>{item.denomination} ({item.season})</p>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`${styles["error-box"]} ${error ? styles["active"] : ""}`}>
                    {error && <p>Error: {error}</p>}
                </div>
            </div>}
        </>
    )
}