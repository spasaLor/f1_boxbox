'use client'
import { formatDistanceToNow } from "date-fns";
import styles from "@/app/[username]/activity/activity.module.css";
import { Rating } from "@mui/material";
import { Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react"

export default function OwnActivityFeed({initialAct,username,isOwner}){
    const [activities,setActivities]=useState(initialAct);
    const [offset,setOffset]=useState(1);
    const [show,setShow] = useState(true);
    const [loading,setLoading]=useState(false);

    const getActivities = async()=>{
        setLoading(true);
        const res = await fetch("/api/user/activity/"+username+"?limit=10&offset="+offset);
        const json = await res.json();
        const newActivities = json.activity;
        if(json.activity.length < 10)
            setShow(false);
        setActivities(prev=>[...prev,...newActivities]);
        setOffset(prev=>prev+1);
        setLoading(false);
    }

    return(
        <>
            <div className={styles["activity-container"]}>
                {activities.map(item=>{
                    switch(item.action){
                        case "liked_review":
                            return <div className={styles["activity-item"]} key={item.activity_date}><p>{ isOwner ? 'You' : username} liked {item.username}'s review of the <Link href={"/"+item.username+"/race/"+item.url+"-"+item.season}>{item.season} {item.denomination}</Link> </p> <p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                        case "reviewed":
                            return <div className={styles["activity-item"]} key={item.activity_date}><p>{ isOwner ? 'You' : username} reviewed the <Link href={"/races/"+item.season+"/"+item.url}>{item.season} {item.denomination} </Link></p><p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                        case "rated":
                            return <div className={styles["activity-item"]} key={item.activity_date}><div className={styles.rating}><p>{ isOwner ? 'You' : username} rated the {item.season} {item.denomination} with</p><Rating precision={0.5} size="small" value={item.race_id} name="read-only" readOnly emptyIcon={<Star size={16} color="var(--color-surface)"/>}/></div>  <p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                        case "viewed":
                            return <div className={styles["activity-item"]} key={item.activity_date}><p>{ isOwner ? 'You' : username} watched the <Link href={"/races/"+item.season+"/"+item.url}>{item.season} {item.denomination} </Link></p><p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                        case "liked":
                            return <div className={styles["activity-item"]} key={item.activity_date}><p>{ isOwner ? 'You' : username} liked the {item.season} {item.denomination}</p><p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                        case "followed":
                            return <div className={styles["activity-item"]} key={item.activity_date}><p>{ isOwner ? 'You' : username} followed <Link href={"/"+item.username}>{item.username}</Link></p> <p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                    }
                })}
            </div>
             <div className={styles.bottom}>
                {show && <button type="button" onClick={getActivities} disabled={loading}>View more</button>}
            </div>
        </>
    )
}