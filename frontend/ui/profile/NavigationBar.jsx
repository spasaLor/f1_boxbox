'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/[username]/user.module.css";

export default function NavigationBar({main,username}){
    const path = usePathname();
    const selected = path.split("/").pop();

    return(
        <div className={styles.nav}>
            {main ? 
                <>
                    <Link href={"/"+username} className={styles.active}>Profile</Link>
                    <Link href={"/"+username+"/races"}>Races</Link>
                    <Link href={"/"+username+"/races/reviews"}>Reviews</Link>
                    <Link href={"/"+username+"/lists"}>Lists</Link>
                </>                            
            :
                <>
                    <div className="not-main"><Link href={"/"+username}>{username}</Link></div> 
                    <Link href={"/"+username+"/races"} className={selected === "races" ? "active" : null}>Races</Link>
                    <Link href={"/"+username+"/races/reviews"} className={selected === "reviews" ? "active" : null}>Reviews</Link>
                    <Link href={"/"+username+"/lists"} className={selected === "lists" ? "active" : null}>Lists</Link>
                </>
            }
        </div>
    )
}