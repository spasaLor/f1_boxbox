import { cookies } from "next/headers";
import styles from "./list.module.css";
import Link from "next/link";
import getMetadata from "@/lib/getMetadata";
import Lists from "@/ui/lists/Lists";
import NavigationBar from "@/ui/profile/NavigationBar";

export async function generateMetadata({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/user/"+username);
    const userData = await res.json();

    return{
        title: (userData.user[4] && userData.user[5]) ? userData.user[4]+" "+userData.user[5]+"'s lists" : userData.user[6]+"'s lists",
        description:"User lists page" 
    }
}

export default async function ListsPage({params}){
    const cookieStore = await cookies();
    const user = cookieStore.get('username');
    const {username} = await params;
    const isOwner = user?.value === username;
    let lists=[];
    if(isOwner){
        const res = await fetch(process.env.BACKEND_URL+"/lists/user?owner=true",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({username})
        });
        const json = await res.json();
        lists = json.lists;
    }else{
        const res = await fetch(process.env.BACKEND_URL+"/lists/user?owner=false",{
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify({username})
        });
        const json = await res.json();
        lists = json.lists;
    }
    
    const metadata = await Promise.all(lists.map(async(item)=>await getMetadata(item.id,'list')));

    return(
        <main className={styles.mainLists}>
            <NavigationBar main={false} username={username}/>
            {lists.length === 0 ?
            <div className={styles.top}>
                {user ?
                    <>
                        <p>Collect, curate, and share. Lists are the perfect way to group films.</p>
                        <Link href={"/"+user.value+"/lists/new"}>
                            <button type="button">Start your own list</button>
                        </Link>
                    </>
                :
                    <p>This user hasn't created a list yet.</p>
                }                
            </div>
            :
            <>
                <div className={styles.header}>
                    {isOwner && <>
                        <p className={styles.name}>Your lists</p>                        
                        <Link href={"/"+username+"/lists/new"}>
                            <button type="button">Start a new list...</button>
                        </Link>
                    </>}
                    {!isOwner && <p className={styles.name}>Lists</p>}
                    
                </div>
                <div className={styles["list-container"]}>
                    <Lists username={username} isOwner={isOwner} lists={lists} metadata={metadata}/>
                </div> 
            </>
            }
        </main>
    )
}