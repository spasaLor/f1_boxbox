import styles from "@/app/races/[season]/[name]/race.module.css";
import { Heart } from "lucide-react";
import Link from "next/link";

export default async function RaceRecentReviews({raceId,name,season}){
    const res = await fetch(process.env.BACKEND_URL+"/races/recent/"+raceId+"/3");
    const json = await res.json();

    return(
        json.reviews.map(item=>(
            <div className={styles["review-item"]} key={item.id}>
                <div className={styles.first}>
                    <Link href={"/"+item.users.username+"/race/"+name+"-"+season}>Review by <b>{item.users.username}</b></Link>
                </div>
                <div className={styles.mid}>
                    <p>{item.content}</p>
                </div>
                <div className={styles.bottom}>
                    <p><Heart size={12}  fill="var(--color-text-secondary)" color="var(--color-text-secondary)"/> {item.likes.length} likes</p>
                </div>
            </div>
        ))
    )
}