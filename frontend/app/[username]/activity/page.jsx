import NavigationBar from "@/ui/profile/NavigationBar";
import { Rating } from "@mui/material";
import Link from "next/link";
import styles from "./activity.module.css";
import { formatDistanceToNow } from 'date-fns';
import { cookies } from "next/headers";
import { Star } from "lucide-react";

export default async function Activity({params}){
    const {username} = await params;
    const cookieStore = await cookies();
    const user = cookieStore.get('username');
    const res = await fetch(process.env.BACKEND_URL+"/user/activity/"+username,{next:{revalidate:60}});
    const json=await res.json();
    const activityData=json.activity;
    const isOwner = username === user?.value; 

    return(
        <main className={styles.main}>
            <NavigationBar main={false} username={username}/>
            <p className={styles.name}>{isOwner ? 'Your Activity': username+"'s Activity"}</p>
            <div className={styles["activity-container"]}>
                {activityData.map(item=>{
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
        </main>
    )


}