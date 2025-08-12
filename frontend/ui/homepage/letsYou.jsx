import { Eye, Grid2x2, Heart, Logs, Notebook, Star } from "lucide-react";
import styles from "./latest.module.css";

export default function LetsYouSection(){
    return(
        <div className={styles.letsyou}>
            <p>f1 boxbox lets you...</p>
            <div className={styles["grid-container"]}>
                <div className={styles["grid-item"]}>
                    <Eye size={32} strokeWidth={1.5}/>
                    <p>Keep track of every race you've ever watched (or just stat from the day you join)</p>
                </div>
                <div className={styles["grid-item"]}>
                    <Heart size={32} strokeWidth={1.5}/>
                    <p>Show some love for your favorite races, lists and reviews with a "like"</p>
                </div>
                <div className={styles["grid-item"]}>
                    <Logs size={32} strokeWidth={1.5}/>
                    <p>Write and share reviews, and follow friends and other members to read theirs</p>
                </div>
                <div className={styles["grid-item"]}>
                    <Star size={32} strokeWidth={1.5}/>
                    <p>Rate each race on a five-star scale (with halves) to record and share your reaction</p>
                </div>
                <div className={styles["grid-item"]}>
                    <Notebook size={32} strokeWidth={1.5}/>
                    <p>Keep a diary of your race watching</p>
                </div>
                <div className={styles["grid-item"]}>
                    <Grid2x2 size={32} strokeWidth={1.5}/>
                    <p>Compile and share lists of races or any topic and keep a watchlist of races to see</p>
                </div>
            </div>
        </div>
    );
}