import getMetadata from "@/lib/getMetadata";
import Comments from "@/ui/comments/Comments";
import RaceReview from "@/ui/reviews/RaceReview";
import { cookies} from "next/headers";
import styles from "./race.module.css";

export async function generateMetadata({params}){
    const {username, raceName} = await params;
    const [name,season] = raceName.split("-");
    const us=await fetch(process.env.BACKEND_URL+"/user/"+username);
    const userData=await us.json();
    const res = await fetch(process.env.BACKEND_URL+"/races/"+season+"/"+name);
    const race = await res.json();

    return{
        title: (userData.user[4] && userData.user[5]) ? userData.user[4]+" "+userData.user[5]+"'s review of the "+race.season+" "+race.denomination : userData.user[6]+"'s review of the "+race.season+" "+race.denomination,
        description:"User's review of a race"
    }
}

export default async function Page({params}){
    const {username, raceName} = await params;
    const cookieStore = await cookies();
    const user=cookieStore.get('username');
    const auth=cookieStore.get('connect.sid');
    const [name,season] = raceName.split("-");
    let initLikes=[];
    const reviewPromise = fetch(process.env.BACKEND_URL+"/reviews/user/"+username+"?race_name="+name+"&season="+season,{next:{revalidate:120}});
    const listsPromise = fetch(process.env.BACKEND_URL+"/lists/user",{
            method:'POST',
            headers:{
                'content-type':'application/json'
            },
            body: JSON.stringify({username})
        });

    if(auth?.value){
        const res = await fetch(process.env.BACKEND_URL+"/reviews/liked",
            {headers:{'Cookie':'connect.sid='+auth.value}}
        );
        const jsonLikes = await res.json();
        initLikes = jsonLikes.likes;
    }
        
    const [revRes,listRes] = await Promise.all([reviewPromise,listsPromise]);
    const jsonRev = await revRes.json();
    const jsonList = await listRes.json();
    
    const isLogged = !!user;
    const {likes,comments} = await getMetadata(jsonRev.review.id,'review');

    return(
        <main className={styles.main}>
            <div className={styles["top-part"]}>
                <RaceReview isLogged={isLogged} data={jsonRev.review} likes={likes} username={username} lists={jsonList.lists} initialLikes={initLikes}/>
            </div>
            <div className={styles["comments-container"]}>
                <p>{comments.length} Comments</p>
                <Comments comments={comments} isLogged={isLogged} targetId={jsonRev.review.id} targetType={'review'} />
            </div>
        </main>
    )
}