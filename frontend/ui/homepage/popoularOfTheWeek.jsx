import { Rating } from "@mui/material";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/ui/homepage/latest.module.css";

export default async function PopularOfTheWeek(){
    const res = await fetch(process.env.BACKEND_URL+"/reviews/popular/week");
    const json=await res.json();

    return(
        <div className={styles.container}>
            <p className={styles.title}>Popular reviews this week</p>
            {json.reviews.map(item=>(
                <div className={styles.item} key={item.id}>
                    <div className={styles.left}>
                        <Image src={item.cover} alt="race_cover" width={75} height={120}/>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.first}>
                            <h2><Link href={"/"+item.username+"/race/"+item.url+"-"+item.season}>{item.denomination}</Link></h2>
                            <p>{item.season}</p>
                        </div>
                        <div className={styles.second}>
                            <Link href={"/"+item.username}>{item.username}</Link>
                            <Rating name="read-only" readOnly value={item.rating} precision={0.5} size="small" emptyIcon={<Star color="var(--color-bg)" strokeWidth={1} size={16}/>} />
                        </div>
                        <p className={styles.content}>{item.content}</p>
                        <p> <Heart fill="var(--color-text-secondary)" size={14} strokeWidth={1} color="var(--color-text-secondary)"/> {item.like_count} likes</p>
                    </div>
                </div>
            ))}
        </div>
        
    )
}