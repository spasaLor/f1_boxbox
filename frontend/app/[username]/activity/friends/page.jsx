
import FollowActivityFeed from "@/ui/profile/followActivityFeed";

export default async function ActivityPage({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/user/activity/"+username+"/following?limit=10&offset=0",{next:{revalidate:60}});
    const json=await res.json();
    const activityData=json.activities;

    return(
        <FollowActivityFeed initialAct={activityData} username={username}/>
    )


}