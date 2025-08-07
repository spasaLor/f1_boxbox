import { Rating } from "@mui/material";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import styles from "@/app/[username]/activity/activity.module.css";
import { Star } from "lucide-react";

export default function DisplayActivity({data}){
    return(
        data.map(item=>{
            switch(item.action){
                case "liked_review":
                    return <div className={styles["activity-item"]} key={item.activity_date}><p><Link href={"/"+item.username}>{item.username}</Link> liked {item.owner_username}'s review of the <Link href={"/"+item.owner_username+"/race/"+item.url+"-"+item.season}>{item.season} {item.denomination}</Link></p> <p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                case "reviewed":
                    return <div className={styles["activity-item"]} key={item.activity_date}><p><Link href={"/"+item.username}>{item.username}</Link> reviewed the <Link href={"/"+item.username+"/race/"+item.url+"-"+item.season}>{item.season} {item.denomination} </Link></p><p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                case "rated":
                    return <div className={styles["activity-item"]} key={item.activity_date}><div className={styles.rating}><p><Link href={"/"+item.username}>{item.username}</Link> rated the {item.season} {item.denomination} with</p><Rating precision={0.5} size="small" value={item.race_id} name="read-only" readOnly emptyIcon={<Star size={16} color="var(--color-surface)"/>}/></div>  <p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                case "viewed":
                    return <div className={styles["activity-item"]} key={item.activity_date}><p><Link href={"/"+item.username}>{item.username}</Link> watched the <Link href={"/races/"+item.season+"/"+item.url}>{item.season} {item.denomination} </Link></p><p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                case "liked":
                    return <div className={styles["activity-item"]} key={item.activity_date}><p><Link href={"/"+item.username}>{item.username}</Link> liked the {item.season} {item.denomination}</p><p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                case "followed":
                    return <div className={styles["activity-item"]} key={item.activity_date}><p><Link href={"/"+item.username}>{item.username}</Link> followed <Link href={"/"+item.owner_username}>{item.owner_username}</Link></p> <p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
            }
        })
    )
}