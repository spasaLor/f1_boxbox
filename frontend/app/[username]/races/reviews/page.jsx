import Reviews from "@/ui/reviews/Reviews";
import { cookies } from "next/headers"
import styles from "./review.module.css";
import NavigationBar from "@/ui/profile/NavigationBar";

export async function generateMetadata({params}){
    const {username} = await params;
    const us=await fetch(process.env.BACKEND_URL+"/user/"+username);
    const userData=await us.json();

    return{
        title: (userData.user[4] && userData.user[5]) ? userData.user[4]+" "+userData.user[5]+"'s reviews": userData.user[6]+"'s reviews",
        description:"User reviews page"
    }
}

export default async function Page({params}){
    const {username} = await params;
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    const user = cookieStore.get('username');
    const isLogged = !!user;
    const isOwner = username === auth?.value;
    let reviews=[];
    let likes=[];

    if(isLogged){
        const revPromise = fetch(process.env.BACKEND_URL+"/reviews/all_from_user/"+username,{
            next:{revalidate:120}
        });
        const likesPromise = fetch(process.env.BACKEND_URL+"/reviews/liked",{
            headers:{'Cookie':'connect.sid='+auth.value},
            cache:'no-store'
        });
        const [resReviews,resLikes] = await Promise.all([revPromise,likesPromise]);
        const jsonRev = await resReviews.json();
        const jsonLikes = await resLikes.json();
        reviews=jsonRev.reviews;
        likes=jsonLikes.likes
    }else{
        const res = await fetch(process.env.BACKEND_URL+"/reviews/all_from_user/"+username,{
            next:{revalidate:120}
        });
        const json=await res.json();
        reviews=json.reviews;
        
    }
    
    return(
        <main className={styles.main}>
            <NavigationBar main={false} username={username}/>
            <p className={styles.name}>Reviews</p>
            <div className={styles["review-box"]}>
                <Reviews reviews={reviews} isLogged={isLogged} isOwner={isOwner} likes={likes} owner={username}/>
            </div>
        </main>
    )
}