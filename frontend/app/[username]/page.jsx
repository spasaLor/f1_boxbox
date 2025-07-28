import NavigationBar from "@/ui/profile/NavigationBar";
import { cookies } from "next/headers";
import styles from "./user.module.css";
import FavRaces from "@/ui/profile/FavoriteRaces";
import RecentRatings from "@/ui/profile/RecentRatings";
import RecentReviews from "@/ui/profile/RecentReviews";

export default async function Page({params}){
    const cookieStore = await cookies();
    const {username} = await params;
    const user = cookieStore.get('username');
    const res = await fetch(process.env.BACKEND_URL+"/user/"+username);
    const userData = await res.json();
    
    const isLogged = !!user;
    const isOwner = user?.value === username;

    return(
        <main className={styles.main}>
            <div className={styles["top-row"]}>
                <div className={styles.left}>
                    <h2>{username}</h2>
                    {!isLogged ? <button type="button">Follow</button> : null }
                </div>
                <div className={styles.right}>
                    <div className={styles["info-item"]}>
                        <p>{userData.viewed}</p>
                        <p className={styles.label}>Races</p>
                    </div>
                    <div className={styles["info-item"]}>
                        <p>{userData.followers}</p>
                        <p className={styles.label}>Followers</p>
                    </div>
                    <div className={styles["info-item"]}>
                        <p>{userData.following}</p>
                        <p className={styles.label}>Following</p>
                    </div>
                </div>
            </div>
            <NavigationBar main={true} username={username}/>
            <div className={styles["fav-races"]}>
                <p className={styles.title}>Favorite Races</p>
                <FavRaces races = {userData.favoriteRaces}/>
            </div>         
            <div className={styles["recent-races"]}>
                <p className={styles.title}>Recent Activity</p>
                <RecentRatings races = {userData.latestActivity} username={username}/>
            </div>         
            <div className={styles["recent-reviews"]}>
                <p className={styles.title}>Recent Reviews</p>
                <RecentReviews reviews = {userData.latestReviews} username={username}/>
            </div>         
        </main>
    )
}