'use client';
import { useRaces } from '@/lib/RacesContext';
import useGetRating from '@/lib/useGetRating';
import { Rating } from '@mui/material';
import { StarIcon } from 'lucide-react';

export default function RatingComponent({id}){
    const [rating,setRating]=useGetRating(id);
    const {viewed,toggleView} = useRaces();
    const isViewed = viewed.includes(id);
    
    console.log(rating);
    const newRating = async(newVal)=>{
        setRating(newVal);
        if(isViewed){
            const res = await fetch("/api/races/rating",{method:'PUT',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({rating:newVal,raceId:id})
            });            
            if(res.ok)
               return console.log("OK");
        }
        else{
            toggleView(id);
            const res = await fetch("/api/races/rating",{method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({rating:newVal,raceId:id})
            });
            if(res.ok)
                return console.log("OK");
        }
    }

    return(
        <Rating precision={0.5} emptyIcon={<StarIcon style={{opacity:0.55}}/>} name='rating' value={rating} onChange={(e,newValue)=>newRating(newValue)} size='large'/>
    )
}