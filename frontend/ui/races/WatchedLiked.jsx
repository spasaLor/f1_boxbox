'use client';
import { useRaces } from '@/lib/RacesContext';
import { Eye, Heart } from 'lucide-react';
import styles from '@/app/races/[season]/[name]/race.module.css';

export default function WatchedLiked({raceId}){
    const{error,liked,viewed,toggleLike,toggleView} = useRaces();
    const isViewed = viewed.includes(raceId);
    const isLiked = liked.includes(raceId);
    
    return(
        <>
            { error  && <div className={styles.errors}><p>{error}</p></div>}
            <div className={styles.icons}>
                <div className={styles.watch}>
                    <Eye size={48} strokeWidth={1} style={isViewed ? {color:'green'} : null} onClick={() => toggleView(raceId)}/>
                    {isViewed ? <p>Remove</p> : <p>Watch</p>}
                </div>
                <div className={styles.like}>
                    <Heart size={48} strokeWidth={1} style={isLiked ? {fill:'orange', color:'orange'}:null} onClick={isViewed ? ()=>toggleLike(raceId) : ()=>{toggleLike(raceId); toggleView(raceId)}}/>
                    {isLiked ? <p>Remove</p> : <p>Like</p>}
                </div>
            </div>
        </>
        
    )
}