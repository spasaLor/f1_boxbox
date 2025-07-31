import Image from "next/image";
import Link from "next/link";
import styles from "@/app/[username]/user.module.css";
import { Rating } from "@mui/material";
import { Heart, Star } from "lucide-react";

export default function RecentReviews({reviews,username}){
    return(
        <div className={styles["reviews-container"]}>
            {reviews.map(item =>(
                <div className={styles["review-item"]} key={item.id}>
                    <div className={styles.image}>
                       <Link href={"/races/"+item.races.season+"/"+item.races.url}><Image src={item.races.cover} alt="race_cover" width={80} height={130}/></Link>
                    </div>
                    <div className={styles.right}>
                        <div className={styles.raceName}>
                            <Link href={"/"+username+"/race/"+item.races.url+"-"+item.races.season}><h2>{item.races.denomination}</h2></Link>
                            <p>{item.races.season}</p>
                        </div>
                        <div className={styles.rating}>
                            <Rating name="read-only" value={Number(item.rating)} precision={0.5} readOnly emptyIcon={<Star color="var(--color-border)" strokeWidth={1}/>} />
                            {item.isLiked ? <Heart fill="orange" strokeWidth={1} size={20}/> : null}
                            <p style={{fontWeight:'200'}}>Watched {new Date(item.updated_at).toLocaleDateString()}</p>
                        </div>
                        <div className={styles.content}>
                            <p>{item.content}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}