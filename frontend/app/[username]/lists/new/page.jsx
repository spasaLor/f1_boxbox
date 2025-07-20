import ListForm from "@/ui/forms/List";
import styles from "@/app/[username]/lists/list.module.css";

export default async function NewList(){
    const res = await fetch(process.env.BACKEND_URL+"/races/all",{cache:'no-cache'});
    const json = await res.json();

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>New List</h2>
            </div>
            <ListForm races={json}/>
        </div>
        
    )
}