import Image from "next/image";
import Status from "./Status";
import { Rating } from "@mui/material";
import { Heart, MessageSquare } from "lucide-react";
import styles from "@/app/[username]/races/reviews/review.module.css";

export default function Reviews({likes,reviews,isLogged,isOwner}){
    return(
        <>
        {reviews.map(item=>(
            <div className={styles["review-item"]} key={item.id}>
                <div className={styles.left}>
                    <Image
                    src={item.races.cover}
                    alt="race_cover"
                    width={100}
                    height={150}
                    />
                </div>
                <div className={styles.right}>
                    <div className={styles.top}>
                        <h2>{item.races.denomination}</h2>
                        <i>{item.races.season}</i>
                    </div>
                    
                    <div className={styles.mid}>
                        <Rating name='read-only' readOnly value={item.rating} emptyIcon={<span/>}/>
                        {item.liked ? <Heart style={{fill:'orange'}}/> : null}
                        <p>Reviewed {new Date(item.updated_at).toLocaleDateString()}</p>
                        {item.comments.length>0 ? <p><MessageSquare/> {item.comments.length}</p> : null}
                    </div>
                    <div className={styles.content}>
                        {item.content}
                    </div>
                    <div className={styles.likes}>
                        <Status initialLiked = {likes.includes(item.id)} id={item.id} isLogged={isLogged} isOwner={isOwner}/>
                        {item.likes.length > 0 ? (<p>{item.likes.length} {item.likes.length === 1 ? 'like' : 'likes'}</p>) : <p>No likes yet</p>} 
                    </div>
                </div>                
            </div>
        ))}
        </>
    )
}