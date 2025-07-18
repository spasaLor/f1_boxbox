'use client';
import { useEffect, useState } from "react";

export default function useGetRating(raceId){
    const [rating,setRating] = useState(null);

    useEffect(()=>{
        if(!raceId) return;
        const getData= async(id)=>{
            const res = await fetch("/api/races/rating/"+id);
            const json=await res.json();
            if(res.ok)
                setRating(json.rating);
        }
        getData(raceId);
    },[raceId]);

    return [rating,setRating];

}