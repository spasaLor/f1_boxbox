import ListForm from "@/ui/forms/List";
import { cookies } from "next/headers";
import styles from "@/app/[username]/lists/list.module.css";

export async function generateMetadata({params}){
    const {username,listName} = await params;
    const l=listName.split("-");

    return{
        title: "Editing "+"'"+l.pop()+"'"+" list",
        description:"User activity page" 
    }
}

export default async function EditList({params}){
    const {username,listName} = await params;
    const cookieStore = await cookies();
    const auth = cookieStore.get("connect.sid");

    const listPromise = fetch(process.env.BACKEND_URL+"/lists/name/"+listName,{
        headers:{
            'Cookie':'connect.sid='+auth.value
        },
        cache:'no-cache'
    });
    const racePromise = fetch(process.env.BACKEND_URL+"/races/all",{cache:'no-cache'});
    const[raceRes,listRes] = await Promise.all([racePromise,listPromise]);
    const races = await raceRes.json();
    const json = await listRes.json();

    return(
        <div className={styles.container}>
            <div className={styles.title}>
                <h2>Edit List</h2>
            </div>
            <ListForm races={races} listData={json.list}/>
        </div>
        
    )
}