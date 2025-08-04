'use client'
import { Heart } from "lucide-react";
import { useState } from "react";
import styles from "@/app/[username]/race/[raceName]/race.module.css";

export default function LikeCounter({init,itemId,initialLikes}){
    const [liked,setLiked]=useState(init);
    const [likes,setLikes]= useState(initialLikes);

    const toggleLike=async()=>{
        if(liked){
            const res = await fetch("/api/reviews/like/",{
                method:'DELETE',
                headers:{'content-type':'application/json'},
                body: JSON.stringify({reviewId:itemId})
            });
            if(res.ok){
                setLikes(prev=>prev-1);
                setLiked(false);
            }
        }else{
            const res = await fetch("/api/reviews/like/",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body: JSON.stringify({reviewId:itemId})
            });
            if(res.ok){
                setLikes(prev=>prev+1);
                setLiked(true);
            }
        }
    }
    return(
        <p className={styles.likes} onClick={toggleLike}><Heart fill={liked ? 'orange':"var(--color-text-secondary)"} strokeWidth={1} size={16}/>{liked ? 'Liked':'Like review'} {likes} {likes === 1 ? 'like': 'likes'}</p>
    )
}