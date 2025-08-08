'use client';
import styles from "@/app/races/[season]/[name]/race.module.css";
import { useEffect, useState } from "react";
import ReviewSmall from "../reviews/ReviewSmall";

export default function AllPopularReviews({name,season,logged ,likedReviews}){
    const [offset,setOffset]=useState(0);
    const [reviews,setReviews] = useState([]);
    const [show,setShow] = useState(true);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const initialReviews = async()=>{
            const res = await fetch("/api/reviews/popular?name="+name+"&season="+season+"&offset=0");
            const json = await res.json();
            if(json.reviews.length < 10)
                setShow(false);
            setReviews(json.reviews);
            setOffset(prev=>prev+1);
        }
        initialReviews();
    },[]);

    const getReviews = async()=>{
        setLoading(true);
        const res = await fetch("/api/reviews/popular?name="+name+"&season="+season+"&offset="+offset);
        const json = await res.json();
        const newReviews = json.reviews;
        if(json.reviews.length < 10)
            setShow(false);
        setReviews(prev=>[...prev,...newReviews]);
        setOffset(prev=>prev+1);
        setLoading(false);
    }
    return(
        <>
            {reviews.map(item=>(
                <div className={styles["review-item"]} key={item.id}>
                    <ReviewSmall item={item} name={name} season={season} isLogged={logged} likedReviews={likedReviews}/>
                </div>
            ))}
            <div className={styles.bottom}>
                {show && <button type="button" onClick={getReviews} disabled={loading}>Load More</button>}
            </div>
        </>
    )
}