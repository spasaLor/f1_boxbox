'use client';
import { useRef } from "react";

export default function Filters({setRaces,year,setYear,setError}){
    const formref = useRef(null);

    const handleChange=async (e)=>{
        if(e.target.value === "")
            return;
        const selectedYear = e.target.value;
        setYear(selectedYear);
        const res = await fetch("/api/races/"+selectedYear);
        const json=await res.json();

        if(res.ok){
            setError(null);
            setRaces(json.races);
        }
        else
            setError(json);
    }

    const trackSearch = async(e)=>{
        e.preventDefault();
        const formData = new FormData(formref.current);
        const res = await fetch("/api/races/track_search",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify({track:formData.get('track')})
        });
        const json = await res.json();
        setRaces(json.races);
    }

    return(
        <>            
            <label htmlFor="year">Year</label>
            <select name="year" id="year" onChange={handleChange} value={year}>
                <option value="2025">2025</option>
                <option value="2024">2024</option>
            </select>
            <p>- OR -</p>
            <form onSubmit={trackSearch} ref={formref}>
                <label htmlFor="track">Track</label>
                <input type="input" name="track" id="track"/>
            </form>
        </>
    )
}