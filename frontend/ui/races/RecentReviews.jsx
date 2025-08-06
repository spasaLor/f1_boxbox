import ReviewSmall from "../reviews/ReviewSmall";
import styles from "@/app/races/[season]/[name]/race.module.css";

export default async function RaceRecentReviews({raceId,name,season,likedReviews,isLogged}){
    const res = await fetch(process.env.BACKEND_URL+"/races/recent/"+raceId+"/3",{next:{revalidate:60}});
    const json = await res.json();

    return(
        json.reviews.map(item=>(
            <div className={styles["review-item"]} key={item.id}>
                <ReviewSmall item={item} name={name} season={season} likedReviews={likedReviews} isLogged={isLogged}/>
            </div>
        ))
    )
}