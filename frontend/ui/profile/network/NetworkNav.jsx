'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/[username]/activity/activity.module.css";

export default function NetworkNav({username}){
    const pathname = usePathname();
    const path= pathname.split("/");
    const last = path[path.length -1];
    const active = last === 'following' ? 'following' : 'followers';

    return(
        <div className={styles.nav}>
            <Link className={active === 'following' ? styles.active : null} href={"/"+username+"/network/following"}>Following</Link>
            <Link className={active === 'followers' ? styles.active : null} href={"/"+username+"/network/followers"}>followers</Link>
        </div>
    )
}