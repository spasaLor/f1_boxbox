'use client';
import { useState } from "react";
import RaceItem from "./RaceItem";
import styles from "@/app/races/races.module.css";
import Filters from "./Filters";
import { useRaces } from "@/lib/RacesContext";

export default function Races({initialRaces,initialYear}){
    const [year,setYear]=useState(initialYear);
    const [races,setRaces]=useState(initialRaces);
    const [error,setError]=useState();
    const { liked, viewed, logged, toggleLike, toggleView } = useRaces();

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
                        <RaceItem logged={logged} item={item} isLiked={liked.includes(item.id)} isViewed={viewed.includes(item.id)} toggleLike={toggleLike} toggleView={toggleView}/>
                    </div>
                ))}
                {error && <p className={styles.error}>{error}</p>}
                {races.length === 0 && <h2>No races for the selected year</h2> }
            </div>
        </>
        
    )
}