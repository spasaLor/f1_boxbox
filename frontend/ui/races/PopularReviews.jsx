import { Heart } from "lucide-react";
import Link from "next/link";
import styles from "@/app/races/[season]/[name]/race.module.css";

export default async function PopularReviews({raceId,season,name}){
    const res = await fetch(process.env.BACKEND_URL+"/races/popular/"+raceId+"/3");
    const json = await res.json();

    return(
        json.popularReviews.map(item=>(
            <div className={styles["review-item"]} key={item.id}>
                <div className={styles.first}>
                    <Link href={"/"+item.users.username+"/race/"+name+"-"+season}>Review by <b>{item.users.username}</b></Link>
                </div>
                <div className={styles.mid}>
                    <p>{item.content}</p>
                </div>
                <div className={styles.bottom}>
                    <p><Heart size={12} color="var(--color-text-secondary)"/> {item.likes.length} likes</p>
                </div>
            </div>
        ))
    )
}