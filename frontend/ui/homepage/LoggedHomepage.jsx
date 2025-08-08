import Link from "next/link";
import DisplayActivity from "../profile/DisplayActivity";
import { cookies } from "next/headers";
import styles from "@/app/page.module.css";

export default async function LoggedHomepage({name}){
    const cookieStore = await cookies();
    const username = cookieStore.get('username');
    const res = await fetch(process.env.BACKEND_URL+"/user/activity/"+username.value+"/following?limit=10&offset=0",{next:{revalidate:60}});
    const json=await res.json();

    return(
        <main className={styles.main}>
            <div className={styles.header}>
                <h2>Welcome back <Link href={"/"+username.value}>{name}</Link>. Here's what your friends have been doing...</h2>
            </div>
            <div className={styles.activity}>
                <div className={styles.top}>
                    <p>New from friends</p>
                    <Link href={"/"+username.value+"/activity/friends"}>All Activity</Link>
                </div>
                <DisplayActivity data={json.activities}/>
            </div>
        </main>
    )
}