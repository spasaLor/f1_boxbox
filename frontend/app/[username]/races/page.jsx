import NavigationBar from "@/ui/profile/NavigationBar";
import RacesGrid from "@/ui/races/RacesGrid";
import styles from "@/app/[username]/user.module.css";

export async function generateMetadata({params}){
    const {username} = await params;
    const us=await fetch(process.env.BACKEND_URL+"/user/"+username);
    const userData=await us.json();

    return{
        title: (userData.user[4] && userData.user[5]) ? userData.user[4]+" "+userData.user[5]+"'s viewed races": userData.user[6]+"'s viewed races",
        description:"User viewed races"
    }
}

export default async function Page({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/races/viewed/user/"+username);
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