'use client';
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import styles from './lists.module.css';
import { LinearProgress } from "@mui/material";
import Link from "next/link";

export default function LoggedSidebar({likes,initialLiked,list,isOwner,username,listName}){
    const [isLiked,setIsLiked]=useState(initialLiked);
    const [viewed,setViewed] = useState([]);

    useEffect(()=>{
        const getViewed = async()=>{
            console.log("fetching", "/api/user/" + username + "/races_viewed");
            const res = await fetch("/api/user/"+username+"/races_viewed");
            const json = await res.json();
            setViewed(json);
        }
        getViewed();
    },[])

    
    const percentage = ()=>{
        if (!viewed?.races?.length) return 0;
        let count=0;
        viewed.races.forEach(element => {
            if(list.races.some(r=>r.id===element.id))
                count++;
        });
        return Math.round(count / list.races.length *100);
    }
    
    const toggleLike = async()=>{
        if(isLiked){
            const res = await fetch("/api/lists/like",{
                method:'DELETE',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({listId:list.id})
            });
            if(res.ok)
                setIsLiked(false);

        }else{
            const res = await fetch("/api/lists/like",{
                method:'POST',
                headers:{
                    'content-type':'application/json'
                },
                body: JSON.stringify({listId:list.id})
            });
            if(res.ok)
                setIsLiked(true);
        }        
    }

    const watchedCount = () => {
        if (!viewed?.races?.length) return 0;

        return list.races.filter(race => 
            viewed.races.some(v => v.id === race.id)
        ).length;
    };

    return(
        <div className={styles.sidebar}>
            <div className={styles.first}>
                <Heart fill={ isLiked ? "orange" : "var(--color-text-secondary)"} size={16} color={ isLiked ? "orange" : "var(--color-text-secondary)"}/> {!isOwner && <p style={{cursor:'pointer'}} onClick={toggleLike}>{ isLiked ? 'Liked' : 'Like this list?'}</p>}
                <p>{isOwner ? (likes>0 ? likes : "No likes yet" ): null}</p>
            </div>
            {isOwner && <div className="edit">
                <Link href={"/"+username+"/lists/edit/"+listName}>Edit or delete this list...</Link>
            </div>}
            <div className={styles.share}>
                <p>Share</p>
            </div>            
            <div className={styles.percentage}>
                <div className={styles.first}>
                    <div className="">
                        <p>You've watched</p>
                        <p>{watchedCount()} of {list.races.length}</p>
                    </div>
                    <h2>{percentage()} %</h2>
                </div>
                <LinearProgress value={percentage()} variant="determinate" sx={{width:'100%'}}/>
            </div>
        </div>
    )
}