import NavigationBar from "@/ui/profile/NavigationBar";
import { cookies } from "next/headers";
import styles from "./user.module.css";
import FavRaces from "@/ui/profile/FavoriteRaces";
import RecentRatings from "@/ui/profile/RecentRatings";
import RecentReviews from "@/ui/profile/RecentReviews";
import Link from "next/link";
import { Earth, EarthIcon, Pin } from "lucide-react";

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
                    <div className={styles["top-left"]}>
                        <h2>{username}</h2>
                        {isLogged ? isOwner ? null : <button type="button">Follow</button> : null }
                        {isOwner && <Link href={"/settings"}>Edit profile</Link>}
                    </div>
                    <div className={styles["user-info"]}>
                        <p>{userData.user[0] ? userData.user[0]:null}</p>
                        <div className={styles.inner}>
                            <p>{userData.user[1] ? <><Pin/> {userData.user[1]}</> : null}</p>
                            <Link href={userData.user[2]}>{userData.user[2] ? <><EarthIcon/> {userData.user[2]}</> : null}</Link>
                        </div>
                    </div>
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
                {userData.favoriteRaces.length>0 ? <>
                    <p className={styles.title}>Favorite Races</p>
                    <FavRaces races = {userData.favoriteRaces}/>
                </> : <p>Don't forget to select your <Link href={"/settings"}>favorite races</Link>! </p>}                
            </div>         
            <div className={styles["recent-races"]}>
                <p className={styles.title}>Recent Activity</p>
                <RecentRatings races = {userData.latestActivity} username={username}/>
            </div>         
            <div className={styles["recent-reviews"]}>
                <div className={styles.title}>
                    <p>Recent Reviews</p>
                    <Link href={"/"+username+"/races/reviews"} >More</Link> 
                </div>
                <RecentReviews reviews = {userData.latestReviews} username={username}/>
            </div>         
        </main>
    )
}