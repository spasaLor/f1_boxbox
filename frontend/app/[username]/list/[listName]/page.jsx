import getMetadata from "@/lib/getMetadata";
import Comments from "@/ui/comments/Comments";
import ListView from "@/ui/lists/listView";
import LoggedSidebar from "@/ui/lists/loggedSidebar";
import NotLoggedSidebar from "@/ui/lists/notLoggedSidebar";
import { cookies } from "next/headers";
import styles from "@/app/[username]/lists/list.module.css";

export default async function List({params}){
    const {username,listName} = await params;
    const id = listName.split("-")[0];    
    const listPromise = fetch(process.env.BACKEND_URL+"/lists/"+Number(id),{
        cache:'no-store'
    });
    const islikedPromise = fetch(process.env.BACKEND_URL+"/lists/like/user/"+Number(id),{
        cache:'no-store'
    });
    const [listRes, isLikedRes] = await Promise.all([listPromise, islikedPromise]);
    const jsonList = await listRes.json();
    const list = jsonList.list;
    const jsonLiked = await isLikedRes.json();
    const isLiked = jsonLiked.liked;

    const cookieStore = await cookies();
    const auth= cookieStore.get('connect.sid');
    const user= cookieStore.get('username');
    const isLogged = !!auth;
    const isOwner = user?.value===username;

    const{likes,comments}= await getMetadata(id);

    return(
        <main className={styles.main}>
            <div className={styles.left}>
                <h2>{list.name}</h2>
                <p>{list.description}</p>
                <ListView isLogged={isLogged} isOwner={isOwner} list={list} username={username}/>
                <div className={styles["comments-container"]}>
                    <p>{comments.length} Comments</p>
                    <Comments comments={comments} isLogged={isLogged} targetType={"list"} targetId={list.id}/>
                </div>
            </div>
            <div className={styles["side-container"]}>
                {!isLogged && <NotLoggedSidebar username={username} likes={likes._count.user_id}/>}
                {isLogged && <LoggedSidebar likes={likes._count.user_id} initialLiked={isLiked} list={list}/>}
            </div>
        </main>
    )
}