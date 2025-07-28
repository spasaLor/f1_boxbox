import { Heart, Star } from "lucide-react";
import Image from "next/image";
import sideStyles from '@/app/races/[season]/[name]/race.module.css';
import Link from "next/link";
import WatchedLiked from "../races/WatchedLiked";
import RatingComponent from "../races/RatingComponent";
import ReviewRace from "../races/ReviewComponent";
import AddToList from "../races/AddToList";
import styles from "@/app/[username]/race/[raceName]/race.module.css";
import { Rating } from "@mui/material";

export default async function RaceReview({isLogged,data,likes,username,lists}){
    return(
        <>
            <div className={styles.image}>
                <Image src={data.races.cover} alt="race_cover" width={150} height={250}/>
            </div>
            <div className={styles["main-content"]}>
                <div className={styles.header}>
                    <p>Review by <Link href={"/"+username}>{username}</Link> </p>
                </div>
                <div className={styles.name}>
                    <h2>{data.races.denomination}</h2>
                    <p>{data.races.season}</p>
                </div>
                <div className={styles.rating}>
                    <Rating name="read-only" value={Number(data.rating)} precision={0.5} readOnly emptyIcon={<Star color="var(--color-border)" strokeWidth={1.5}/>} />
                    {data.is_liked ? <Heart fill="orange" strokeWidth={1} size={24}/> : null}
                </div>
                <p style={{fontWeight:'200'}}>Reviewed {new Date(data.updated_at).toLocaleDateString()}</p>
                <p style={{fontWeight:'600'}}>{data.content}</p>
                <p className={styles.likes}><Heart fill="var(--color-text-secondary)" strokeWidth={1} size={16}/> {likes} likes</p>
            </div>
            <div className={styles["side-bar"]}>                
                <div className={sideStyles.interaction}>
                    {!isLogged && 
                        <div className={sideStyles["not-logged"]}>
                            <p> <Link href={"/"+username}>{username}</Link> is using F1BoxBox to share film reviews and lists with friends.</p>
                            <p>Sign in to log, rate or review</p>
                            <div className={sideStyles["share"]}>
                                <Link href={"#"}>Share...</Link>
                            </div>
                        </div>}
                    {isLogged &&
                        <div className={sideStyles["activity-buttons"]}>
                            <div className={sideStyles["watch-like"]}>
                                <WatchedLiked raceId={data.races.id}/>
                            </div>
                            <div className={sideStyles["rating"]}>
                                {data.rating >0 ? <p>Rated</p> : <p>Rate</p>}
                                <RatingComponent id={data.races.id}/>
                            </div>
                            <div className={sideStyles["review"]}>
                                <ReviewRace item={data.races}/>
                            </div>
                            <div className={sideStyles["lists"]}>
                                <AddToList lists={lists} item={data.races}/>
                            </div>
                            <div className={sideStyles["share"]}>
                                <Link href={"#"}>Share...</Link>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </>
        
    )
}