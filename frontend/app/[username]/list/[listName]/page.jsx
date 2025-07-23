import ListView from "@/ui/lists/listView";
import LoggedSidebar from "@/ui/lists/loggedSidebar";
import NotLoggedSidebar from "@/ui/lists/notLoggedSidebar";
import { cookies } from "next/headers";

export default async function List({params}){
    const {username,listName} = await params;
    const id = listName.split("-")[0];    
    const listPromise = fetch(process.env.BACKEND_URL+"/lists/"+Number(id),{
        cache:'no-store'
    });
    const likesPromise = fetch(process.env.BACKEND_URL+"/lists/like/"+Number(id),{
        next:{revalidate:120}
    });
    const islikedPromise = fetch(process.env.BACKEND_URL+"/lists/like/user/"+Number(id),{
        cache:'no-store'
    });
    const [listRes, likesRes,isLikedRes] = await Promise.all([listPromise, likesPromise,islikedPromise]);
    const jsonList = await listRes.json();
    const list = jsonList.list;
    const jsonLikes = await likesRes.json();
    const likes = jsonLikes.likes;
    const jsonLiked = await isLikedRes.json();
    const isLiked = jsonLiked.liked;

    const cookieStore = await cookies();
    const auth= cookieStore.get('connect.sid');
    const user= cookieStore.get('username');
    const isLogged = !!auth;
    const isOwner = user?.value===username;

    return(
        <>
            <div className="main-container">
                <h2>{list.title}</h2>
                <p>{list.description}</p>
                <ListView isLogged={isLogged} isOwner={isOwner} list={list} username={username}/>
            </div>
            <div className="side-container">
                {!isLogged && <NotLoggedSidebar username={username} likes={likes._count.user_id}/>}
                {isLogged && <LoggedSidebar likes={likes._count.user_id} initialLiked={isLiked} list={list}/>}
            </div>
        </>
        
    )

}