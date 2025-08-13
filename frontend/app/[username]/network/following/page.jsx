import DisplayData from "@/ui/profile/network/DisplayNetworkData";
import styles from "@/ui/profile/network/network.module.css";

export async function generateMetadata({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/user/"+username);
    const userData = await res.json();

    return{
        title: (userData.user[4] && userData.user[5]) ? userData.user[4]+" "+userData.user[5]+"'s friends" : userData.user[6]+"'s friends",
        description:"User friends page",
    }
}
export default async function Page({params}){
    const {username}=await params;
    return(
        <div className={styles.inner}>
            <DisplayData username={username}/>
        </div>
    )
}