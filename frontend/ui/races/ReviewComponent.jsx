'use client';

import { Heart } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import RatingComponent from "./RatingComponent";
import styles from "./review.module.css";
import { useRaces } from "@/lib/RacesContext";
import { useRouter } from "next/navigation";

export default function ReviewRace({item,review=null}){
    const [open,setOpen] = useState(false);
    const textRef = useRef(null);
    const { liked, toggleLike, reviewed } = useRaces();
    const isLiked = liked.includes(item.id);
    const isReviewed = reviewed.includes(item.id);
    const [error,setError]=useState('');
    const nav = useRouter();

    const focusedText = ()=>{
        textRef.current.rows="20";
    }

    const saveReview = async()=>{
        const rev = textRef.current.value;
        
        if(isReviewed){
            const res = await fetch("/api/reviews/"+review.id,{
                method:'PUT',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({review:rev})
            });
            if(res.ok){
                setError("");
                setOpen(false);
                nav.refresh();
            }
            else{
                const json=await res.json();
                setError(json.message);
            }
        }
        else{
            const res = await fetch("/api/races/reviews/"+item.id,{
                method:'POST',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({review:rev})
            });
            if(res.ok){
                setError("");
                setOpen(false);
                nav.refresh();
            }
            else{
                const json=await res.json();
                setError(json.message);
            }
        }
    }

    return(
        <>
            <p onClick={()=>setOpen(true)} className={styles.phrase}>{ isReviewed ? "Edit your review..." : "Review or log..."}</p>
            {open && 
                <div className={styles.container}>
                    <div className={styles.inner}>
                        <div className={styles.top}>
                            <h2>I watched... </h2>
                            <h2 onClick={()=>setOpen(false)} className={styles.close}>X</h2>
                        </div>
                        <div className={styles.mid}>
                            <div className={styles.cover}>
                                <Image
                                src={item.cover}
                                alt={item.url}
                                width={200}
                                height={300}
                                />
                            </div>
                            <div className={styles.right}>
                                <div className={styles.title}>
                                    <h2>{item.denomination}</h2>
                                    <p>{item.season}</p>
                                </div>
                                <textarea name="review" rows="10" placeholder="add a review..." ref={textRef} onFocus={focusedText} defaultValue={review ? review.content : ""}>        
                                </textarea>
                                <div className={styles.bottom}>
                                    <div className={styles.rate}>
                                        <p>Rating</p>
                                        <RatingComponent id={item.id}/>
                                    </div>                                
                                    <div className={styles.like}>
                                        <p>Like</p>
                                        <Heart size={30} strokeWidth={1} style={isLiked ? {fill:'orange'} : null} onClick={()=>toggleLike(item.id)}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.last}>
                            {error && <p className={styles.error}>{error}</p> }
                            <button type="button" onClick={saveReview}>{ isReviewed ? "Edit Review" : "Save Review"}</button>
                        </div>
                    </div>
                </div>
            }
        </>
        
    )
}
