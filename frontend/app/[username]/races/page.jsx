import NavigationBar from "@/ui/profile/NavigationBar";
import RacesGrid from "@/ui/races/RacesGrid";
import styles from "@/app/[username]/user.module.css";

export default async function Page({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/races/viewed/user/"+username,{next:{revalidate:120}});
    const json = await res.json();

    return(
        <main className={styles.main}>
            <NavigationBar main={false} username={username}/>
            <p className={styles.name}>Viewed</p>
            <div className={styles["races-container"]}>
                <RacesGrid races={json.races} username={username}/>
            </div>
        </main>
    )
}