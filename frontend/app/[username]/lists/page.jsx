import { Pencil } from "lucide-react";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";
import styles from "./list.module.css";
import Link from "next/link";

export default async function ListsPage(){
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    const user = cookieStore.get('username');
    if(!auth || !user)
        redirect("/");
    const res = await fetch(process.env.BACKEND_URL+"/lists/user",{
        headers:{
            'Cookie':'connect.sid='+auth.value
        },
    });
    const json = await res.json();
    const lists = json.lists;

    return(
        lists.length === 0 ?
            <div className={styles.top}>
                <p>Collect, curate, and share. Lists are the perfect way to group films.</p>
                <Link href={"/"+user.value+"/lists/new"}>
                    <button type="button">Start your own list</button>
                </Link>
                
            </div> :
            <>
                <div className={styles.header}>
                    <h2>Your lists</h2>
                    <Link href={"/"+user.value+"/lists/new"}>
                        <button type="button">Start a new list...</button>
                    </Link>
                </div>
                <div className={styles["list-container"]}>
                    {lists.map(item=>(
                        <div className={styles["list-item"]} key={item.id}>
                            <div className={styles["lists-left"]}>
                                {item.covers.slice(0,5).map((race, index) => (
                                    <div className={styles.cover} key={index}>
                                        <Image
                                            src={race}
                                            alt="race_cover"
                                            width={80}
                                            height={120}
                                        />
                                    </div>
                                ))}
                                {Array.from({length: 5 - item.covers.length}).map((_, index) => (
                                    <div className={styles.cover} key={`blank-${index}`}>
                                        <div className={styles["blank-cover"]}></div>
                                    </div>
                                ))}
                            </div>
                            <div className={styles["lists-right"]}>
                                <Link href={"/"+user.value+"/list/"+item.name} className={styles["list-name"]}>{item.name}</Link>
                                <div >
                                    <p>{item.races.length} races</p>
                                    <Link href={"/"+user.value+"/lists/edit/"+item.name}> <Pencil size={14}/> </Link>
                                </div>
                                
                            </div>
                        </div>
                        
                    ))}
                </div> 
            </>
                          
    )
}