import NavigationBar from "@/ui/profile/NavigationBar";
import { Rating } from "@mui/material";
import Link from "next/link";
import styles from "./activity.module.css";
import { formatDistanceToNow } from 'date-fns';

export default async function Activity({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/user/activity/"+username,{next:{revalidate:60}});
    const json=await res.json();
    const activityData=json.activity;

    return(
        <main className={styles.main}>
            <NavigationBar main={false} username={username}/>
            <p className={styles.name}>{username}'s Activity</p>
            <div className={styles["activity-container"]}>
                {activityData.map(item=>{
                    switch(item.action){
                        case "liked_review":
                            return <div className={styles["activity-item"]}><p>{username} liked {item.username}'s review of the {item.season} {item.denomination}</p> <p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                        case "reviewed":
                            return <div className={styles["activity-item"]}><p>{username} reviewed the {item.season} {item.denomination}</p><p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                        case "rated":
                            return <div className={styles["activity-item"]}><div className={styles.rating}><p>{username} rated the {item.season} {item.denomination} with</p><Rating precision={0.5} size="small" value={item.race_id} name="read-only" readOnly/></div>  <p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                        case "viewed":
                            return <div className={styles["activity-item"]}><p>{username} watched the {item.season} {item.denomination}</p><p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                        case "liked":
                            return <div className={styles["activity-item"]}><p>{username} liked the {item.season} {item.denomination}</p><p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                        case "followed":
                            return <div className={styles["activity-item"]}><p>{username} followed <Link href={"/"+item.username}>{item.username}</Link></p> <p>{formatDistanceToNow(new Date(item.activity_date), {addSuffix:true})}</p></div>
                    }
                })}
            </div>
        </main>
    )


}