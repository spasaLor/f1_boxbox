'use client';
import { useRef, useState } from "react";
import RaceItem from "./RaceItem";
import styles from "@/app/races/races.module.css";
import Filters from "./Filters";

export default function Races({logged,initialRaces,initialYear,initialLiked,initialViewed}){
    const [year,setYear]=useState(initialYear);
    const [races,setRaces]=useState(initialRaces);
    const [error,setError]=useState();
    const [likedRaces,setLikedRaces]=useState(initialLiked);
    const [viewedRaces,setViewedRaces]=useState(initialViewed);

    const toggleLike = async(id)=>{
        if(likedRaces.includes(id)){
            const res = await fetch("/api/races/liked",{method:'DELETE',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({raceId:id})
            })
            const json=await res.json();
            if(res.ok){
                const updatedLiked = likedRaces.filter(id=>id !== id);
                setLikedRaces(updatedLiked);
            }
            else
                console.log(json.error);
        }
        else{
            const res = await fetch("/api/races/liked",{method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({raceId:id})
            })
            const json=await res.json();
            if(res.ok){
                setLikedRaces(prev=>[...prev,id]);
            }
            else
                console.log(json.error)
        }
    }
    const toggleView = async(id)=>{
        if(viewedRaces.includes(id)){
            const res = await fetch("/api/races/viewed",{method:'DELETE',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({raceId:id})
            })
            const json=await res.json();
            if(res.ok){
                const updatedViewed = viewedRaces.filter(id=>id !== id);
                setViewedRaces(updatedViewed);
            }
            else
                console.log(json.error);
        }
        else{
            const res = await fetch("/api/races/viewed",{method:'POST',
                headers:{
                    'Content-type':'application/json'
                },
                body:JSON.stringify({raceId:id})
            })
            const json=await res.json();
            if(res.ok){
                setViewedRaces(prev=>[...prev,id]);
            }
            else
                console.log(json.error)
        }
    }

    return(
        <>
            <div className={styles.top}>
                <p>RACES</p>
                <p>BROWSE BY</p>
                <div className={styles.options}>
                    <Filters year={year} setYear={setYear} setError={setError} setRaces={setRaces} />
                </div>
            </div>
            <div className={styles.races}>
                {races.map(item=>(
                    <div className={styles.raceItem} key={item.id}>
                        <RaceItem logged={logged} item={item} isLiked={likedRaces.includes(item.id)} isViewed={viewedRaces.includes(item.id)} toggleLike={toggleLike} toggleView={toggleView}/>
                    </div>
                ))}
                {error && <p className={styles.error}>{error}</p>}
                {races.length === 0 && <h2>No races for the selected year</h2> }
            </div>
        </>
        
    )
}