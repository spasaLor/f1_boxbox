import FollowActivityFeed from "@/ui/profile/followActivityFeed";

export async function generateMetadata({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/user/"+username);
    const userData = await res.json();

    return{
        title: (userData.user[4] && userData.user[5]) ? userData.user[4]+" "+userData.user[5]+"'s activity" : userData.user[6]+"'s activity",
        description:"User's friends activity page" 
    }
}

export default async function ActivityPage({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/user/activity/"+username+"/following?limit=10&offset=0",{next:{revalidate:60}});
    const json=await res.json();
    const activityData=json.activities;

    return(
        <FollowActivityFeed initialAct={activityData} username={username}/>
    )


}