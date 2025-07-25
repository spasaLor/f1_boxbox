'use client';
import Cookies from "js-cookie";
import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import styles from './lists.module.css';
import { LinearProgress } from "@mui/material";

export default function LoggedSidebar({likes,initialLiked,list}){
    const [isLiked,setIsLiked]=useState(initialLiked);
    const [viewed,setViewed] = useState([]);
    const cookieStore = Cookies;
    const auth = cookieStore.get('connect.sid');

    useEffect(()=>{
        const getViewed = async()=>{
            const res = await fetch(process.env.BACKEND_URL+"/races/viewed",{headers:{
            'Cookie':'connect.sid='+auth
            }});
            const json = await res.json();
            setViewed(json);
        }
        getViewed();
    },[])


    const percentage = ()=>{
        let count=0;
        viewed.forEach(element => {
            if(list.races.contains(element))
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

    return(
        <div className={styles.sidebar}>
            <div className={styles.first}>
                <Heart fill="var(--color-text-secondary)" size={16}/> <p onClick={toggleLike}>Like this list?</p> <p>{likes}</p>
            </div>
            <div className={styles.share}>
                <p>Share</p>
            </div>
            <div className={styles.percentage}>
                <div className={styles.first}>
                    <div className="">
                        <p>You've watched</p>
                        <p>{viewed.length} of {list.races.length}</p>
                    </div>
                    <h2>{percentage()} %</h2>
                </div>
                <LinearProgress value={percentage()} variant="determinate" sx={{width:'100%'}}/>
            </div>
        </div>
    )
}