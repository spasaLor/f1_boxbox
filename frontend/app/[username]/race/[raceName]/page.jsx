import getMetadata from "@/lib/getMetadata";
import Comments from "@/ui/comments/Comments";
import RaceReview from "@/ui/reviews/RaceReview";
import { cookies } from "next/headers";
import styles from "./race.module.css";

export default async function Page({params}){
    const {username, raceName} = await params;
    const cookieStore = await cookies();
    const user=cookieStore.get('username');
    const [name,season] = raceName.split("-");
    const reviewPromise = fetch(process.env.BACKEND_URL+"/reviews/user/"+username+"?race_name="+name+"&season="+season,{next:{revalidate:300}});
    const listsPromise = fetch(process.env.BACKEND_URL+"/lists/user",{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({username})
        });
    const [revRes,listRes] = await Promise.all([reviewPromise,listsPromise]);
    const jsonRev = await revRes.json();
    const jsonList = await listRes.json();
    const isLogged = !!user;
    const {likes,comments} = await getMetadata(jsonRev.review.id,'review');

    return(
        <main className={styles.main}>
            <div className={styles["top-part"]}>
                <RaceReview isLogged={isLogged} data={jsonRev.review} likes={likes} username={username} lists={jsonList.lists}/>
            </div>
            <div className={styles["comments-container"]}>
                <p>{comments.length} Comments</p>
                <Comments comments={comments} isLogged={isLogged} targetId={jsonRev.review.id} targetType={'review'} />
            </div>
        </main>
    )
}