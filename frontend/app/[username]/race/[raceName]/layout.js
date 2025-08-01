import { RacesProvider } from "@/lib/RacesContext";
import { cookies } from "next/headers";

export default async function RacesLayout({children}){
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    const user = cookieStore.get('username');

    let liked=[];
    let viewed=[];
    let reviewed=[];
    let logged=false;

    if(auth){
        const likedPromise = fetch(process.env.BACKEND_URL+"/races/liked",{headers:{
            'Cookie':'connect.sid='+auth.value
        },
        cache:'no-cache'});
        const viewedPromise = fetch(process.env.BACKEND_URL+"/races/viewed",{headers:{
            'Cookie':'connect.sid='+auth.value
        },
        cache:'no-cache'});
        const reviewedPromise = fetch(process.env.BACKEND_URL+"/reviews/all_from_user/"+user.value,{cache:'no-cache'});
        const [likedRes,viewedRes,reviewedRes]= await Promise.all([likedPromise,viewedPromise,reviewedPromise]);
        liked = await likedRes.json();
        viewed = await viewedRes.json();
        reviewed= await reviewedRes.json();
        logged=true;
    } 

    return(
        <RacesProvider
        logged={logged}
        viewed={logged ? viewed.map(i=>i.race_id):[]}
        liked={logged ? liked.map(i=>i.race_id): []}
        reviewed={logged ? reviewed.reviews.map(i=>i.race_id):[]}
        >
            {children}
        </RacesProvider>
    )
}