'use client';
import { useRaces } from '@/lib/RacesContext';
import { Eye, Heart } from 'lucide-react';

export default function WatchedLiked({raceId}){
    const{liked,viewed,toggleLike,toggleView} = useRaces();
    const isViewed = viewed.includes(raceId);
    const isLiked = liked.includes(raceId);

    return(
        <div className="icons">
            <Eye style={isViewed ? {color:'green'}:null} onClick={()=>toggleView(raceId)}/> <Heart style={isLiked ? {color:'orange'}:null} onClick={()=>toggleLike(raceId)}/>
        </div>
    )
}