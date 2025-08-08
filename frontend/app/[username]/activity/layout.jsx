import ActivityNav from "@/ui/profile/ActivityNav";
import NavigationBar from "@/ui/profile/NavigationBar";
import styles from "./activity.module.css";
import { cookies } from "next/headers";

export default async function Layout({params,children}){
    const {username} = await params;
    const cookieStore = await cookies();
    const user = cookieStore.get('username');

    return(
        <main className={styles.main}>
            <NavigationBar main={false} username={username}/>
            <div className={styles.content}>
                <ActivityNav username={username} isOwner={user?.value === username}/>
                {children}
            </div>
        </main>
    )
}