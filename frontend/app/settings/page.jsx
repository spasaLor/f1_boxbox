import SettingsForm from "@/ui/forms/Settings";
import FavoriteRacesSelector from "@/ui/profile/selectFavoriteRaces";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";
import styles from "./settings.module.css";

export default async function Settings(){
    const cookieStore = await cookies();
    const auth = cookieStore.get("connect.sid");
    if(!auth)
        redirect("/");
    const res = await fetch(process.env.BACKEND_URL+"/user",{
        headers:{"Cookie":"connect.sid="+auth.value}
    });
    const json = await res.json();

    return(
        <main className={styles.main}>
            <p>Account Settings</p>
            <div className={styles.content}>
                <div className={styles.left}>
                    <SettingsForm data={json.user}/>
                </div>
                <div className={styles.right}>
                    <p>Favorite Races</p>
                    <FavoriteRacesSelector/>
                </div>
            </div>
        </main>
    )
}