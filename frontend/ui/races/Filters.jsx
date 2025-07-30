'use client';
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function Filters({setRaces,year,setYear,races}){
    const nav = useRouter();
    const [track,setTrack]=useState('');
    const allRacesRef = useRef(races);

    const handleChange=async (e)=>{
        if(e.target.value === "")
            return;
        const selectedYear = e.target.value;
        setYear(selectedYear);
        nav.push("/races/"+selectedYear);
    }

    const trackSearch = (e)=>{
        setTrack(e.target.value.toLowerCase());
        
        if(e.target.value){
            const toShow = allRacesRef.current.filter(item=>item.circuit_name.toLowerCase().includes(e.target.value.toLowerCase()));
            setRaces(toShow);
        }
        else{
            setRaces(allRacesRef.current);
        }              
    }

    return(
        <>            
            <label htmlFor="year">Year</label>
            <select name="year" id="year" onChange={handleChange} value={year}>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
            </select>
            <p>- OR -</p>
            <label htmlFor="track">Track</label>
            <input type="input" name="track" id="track" value={track} onInput={trackSearch}/>
        </>
    )
}