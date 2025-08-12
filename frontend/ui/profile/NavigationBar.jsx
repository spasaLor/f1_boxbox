'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/[username]/user.module.css";
import { ArrowDownLeft } from "lucide-react";

export default function NavigationBar({main,username}){
    const path = usePathname();
    const selected = path.split("/").pop();

    return(
            main ? 
                <div className={styles.nav}>
                    <Link href={"/"+username} className={styles.active}>Profile</Link>
                    <Link href={"/"+username+"/races"}>Races</Link>
                    <Link href={"/"+username+"/races/reviews"}>Reviews</Link>
                    <Link href={"/"+username+"/lists"}>Lists</Link>
                    <Link href={"/"+username+"/likes"}>Likes</Link>
                    <Link href={"/"+username+"/activity"}>Activity</Link>
                    <Link href={"/"+username+"/network/followers"}>Network</Link>
                </div>                            
            :
                <div className={styles["not-main"]}>
                    <Link href={"/"+username}>{username}</Link>
                    <div>
                        <Link href={"/"+username+"/races"} className={selected === "races" ? styles.active : null}>Races</Link>
                        <Link href={"/"+username+"/races/reviews"} className={selected === "reviews" ? styles.active : null}>Reviews</Link>
                        <Link href={"/"+username+"/lists"} className={selected === "lists" ? styles.active : null}>Lists</Link>
                        <Link href={"/"+username+"/likes"} className={selected === "likes" ? styles.active : null}>Likes</Link>                        
                        <Link href={"/"+username+"/activity"} className={path.includes("activity") ? styles.active : null}>Activity</Link>
                        <Link href={"/"+username+"/network/followers"} className={path.includes("network") ? styles.active : null}>Network</Link>
                    </div>                    
                    <ArrowDownLeft/>
                </div>             
    )
}