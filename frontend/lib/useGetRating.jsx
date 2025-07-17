'use client';
import { useEffect, useState } from "react";

export default function useGetRating(raceId){
    const [rating,setRating] = useState(0);

    useEffect(()=>{
        if(!raceId) return;
        const getData= async(id)=>{
            const res = await fetch("/api/races/rating/"+id);
            const json=await res.json();
            console.log(json);
            setRating(json.rating);
        }
        getData(raceId);
    },[raceId]);

    return [rating,setRating];

}