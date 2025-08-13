import { cookies } from "next/headers";
import OwnActivityFeed from "@/ui/profile/OwnActivityFeed";

export async function generateMetadata({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/user/"+username);
    const userData = await res.json();

    return{
        title: (userData.user[4] && userData.user[5]) ? userData.user[4]+" "+userData.user[5]+"'s activity" : userData.user[6]+"'s activity",
        description:"User activity page" 
    }
}

export default async function Activity({params}){
    const {username} = await params;
    const cookieStore = await cookies();
    const user = cookieStore.get('username');
    const res = await fetch(process.env.BACKEND_URL+"/user/activity/"+username+"?limit=10&offset=0",{next:{revalidate:60}});
    const json=await res.json();
    const activityData=json.activity;
    const isOwner = username === user?.value; 

    return(
        <OwnActivityFeed initialAct={activityData} username={username} isOwner={isOwner}/>
    )


}