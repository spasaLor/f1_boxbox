import NavigationBar from "@/ui/profile/NavigationBar";
import NetworkNav from "@/ui/profile/network/NetworkNav";
import styles from "../activity/activity.module.css";

export default async function Layout({children,params}){
    const {username} = await params;
    return(
        <main className={styles.main}>
            <NavigationBar username={username} main={false}/>
            <div className={styles.content}>
                <NetworkNav username={username}/>
                {children}
            </div>
        </main>
    )
}