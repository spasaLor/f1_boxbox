'use client';
import { useRaces } from '@/lib/RacesContext';
import useGetRating from '@/lib/useGetRating';
import { Rating } from '@mui/material';
import { StarIcon } from 'lucide-react';
import styles from '@/app/races/[season]/[name]/race.module.css';

export default function RatingComponent({id}){
    const [rating,setRating]=useGetRating(id);
    const {viewed,toggleView} = useRaces();
    const isViewed = viewed.includes(id);

    const newRating = async(newVal)=>{
        if(rating!==null){
            const res = await fetch("/api/races/rating",{method:'PUT',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({rating:newVal,raceId:id})
            });
            if(res.ok)
                setRating(newVal);
        }
        else{
            if(!isViewed)
                toggleView(id);
            const res = await fetch("/api/races/rating",{method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({rating:newVal,raceId:id})
            });
            if(res.ok)
                setRating(newVal);
        }
    }

    const removeRating = async(raceId)=>{
        const res = await fetch("/api/races/rating/"+raceId,{
            method:'DELETE',
            headers:{
                'content-type':'application/json'
            }
        });
        if(res.ok){
            setRating(null);
        }
    }

    return(
        <div className={styles["inner-rating"]}>
            <Rating precision={0.5} emptyIcon={<StarIcon style={{opacity:1, color:'var(--color-text-secondary)'}} fontSize='inherit' size={30} strokeWidth={1}/>} name='rating' value={rating} onChange={(e,newValue)=>newRating(newValue)} size='large'/>
            {rating>0 ? <p onClick={()=>removeRating(id)}>X</p> :null }
        </div>
    )
}