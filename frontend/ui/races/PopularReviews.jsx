import ReviewSmall from "../reviews/ReviewSmall";
import styles from "@/app/races/[season]/[name]/race.module.css";

export default async function PopularReviews({raceId,season,name,likedReviews,isLogged}){
    const res = await fetch(process.env.BACKEND_URL+"/races/popular/"+raceId+"/3",{next:{revalidate:300}});
    const json = await res.json();

    return(
        json.popularReviews.map(item=>(
            <div className={styles["review-item"]} key={item.id}>
                <ReviewSmall item={item} name={name} season={season} likedReviews={likedReviews} isLogged={isLogged}/>
            </div>
        ))
    )
}