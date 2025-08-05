import NavigationBar from "@/ui/profile/NavigationBar";
import { cookies } from "next/headers";
import styles from "./user.module.css";
import FavRaces from "@/ui/profile/FavoriteRaces";
import RecentRatings from "@/ui/profile/RecentRatings";
import RecentReviews from "@/ui/profile/RecentReviews";
import Link from "next/link";
import { EarthIcon, Pin } from "lucide-react";
import FollowButton from "@/ui/buttons/Follow";
import Image from "next/image";

export default async function Page({params}){
    const {username} = await params;
    const cookieStore = await cookies();
    const user = cookieStore.get('username');
    const auth = cookieStore.get('connect.sid');
    const isLogged = !!user;
    const isOwner = user?.value === username;
    let following = null;

    const res = await fetch(process.env.BACKEND_URL+"/user/"+username);
    const userData = await res.json();
    if(isLogged){
        const resFollow = await fetch(process.env.BACKEND_URL+"/user/follow/"+username,{
            headers:{'Cookie':'connect.sid='+auth.value}
        });
        const json = await resFollow.json();
        following=json.isFollowing;
    }   
    
    return(
        <main className={styles.main}>
            <div className={styles["top-row"]}>
                <div className={styles.left}>
                    <div className={styles["top-left"]}>
                        <Image src={userData.user[3]} alt="profile_picture" width={50} height={50} />
                        <h2>{username}</h2>
                        {isLogged ? isOwner ? null : <FollowButton initial={following} toFollow={username}/> : null }
                        {isOwner && <button><Link href={"/settings"}>Edit profile</Link></button>}
                    </div>
                    <div className={styles["user-info"]}>
                        <p>{userData ? userData.user[0]:null}</p>
                        <div className={styles.inner}>
                            <p>{userData.user[1] ? <><Pin/> {userData.user[1]}</> : null}</p>
                            <Link href={userData.user[2] ? userData.user[2] :'' }>{userData.user[2] ? <><EarthIcon/> {userData.user[2]}</> : null}</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles["info-item"]}>
                        <p>{userData.viewed}</p>
                        <p className={styles.label}>Races</p>
                    </div>
                    <div className={styles["info-item"]}>
                        <p>{userData.lists}</p>
                        <p className={styles.label}>Lists</p>
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