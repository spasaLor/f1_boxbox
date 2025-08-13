import PopularLists from "@/ui/lists/popularLists";
import RecentlyLiked from "@/ui/lists/recentLikedLists";
import { cookies } from "next/headers";
import styles from "./listsPage.module.css";
import Link from "next/link";

export const metadata={
    title:"Lists",
    description:"The main page for all the lists",
}

export default async function Page(){
    const cookieStore = await cookies();
    const user = cookieStore.get('username');
    const popularPromise = fetch(process.env.BACKEND_URL+"/lists/popular",{next:{revalidate:600}});
    const recentPromise = fetch(process.env.BACKEND_URL+"/lists/recently_liked");
    const [popRes,recRes] = await Promise.all([popularPromise,recentPromise]);
    const jsonPop = await popRes.json();
    const jsonRec = await recRes.json();

    return(
        <div className={styles.main}>
            <div className={styles.header}>
                <p>Collect, curate, and share. Lists are the perfect way to group films.</p>
                <Link style={user ? {}: {pointerEvents:'none'}} href={"/"+user?.value+"/lists/new"} >Start your own list</Link>
            </div>
            <section className={styles.popular}>
                <PopularLists data={jsonPop} />
            </section>
            <section className={styles.recently}>
                <RecentlyLiked data={jsonRec}/>
            </section>
        </div>
    )
}