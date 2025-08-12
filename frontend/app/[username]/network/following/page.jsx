import DisplayData from "@/ui/profile/network/DisplayNetworkData";
import styles from "@/ui/profile/network/network.module.css";
export default async function Page({params}){
    const {username}=await params;
    return(
        <div className={styles.inner}>
            <DisplayData username={username}/>
        </div>
    )
}