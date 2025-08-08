'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/[username]/activity/activity.module.css";

export default function ActivityNav({username, isOwner}){
    const pathname = usePathname();
    const path= pathname.split("/");
    const last = path[path.length -1];
    const active = last === 'activity' ? 'own' : 'friends';

    return(
        <div className={styles.nav}>
            <Link className={active === 'own' ? styles.active : null} href={"/"+username+"/activity"}  >{isOwner ? 'Your Activity': username}</Link>
            <Link className={active === 'friends' ? styles.active : null} href={"/"+username+"/activity/friends"}>Friends</Link>
        </div>
    )
}