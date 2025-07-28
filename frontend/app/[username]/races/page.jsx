import RacesGrid from "@/ui/races/RacesGrid";

export default async function Page({params}){
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/races/viewed/user/"+username,{next:{revalidate:120}});
    const json = await res.json();

    return(
        <div className="container">
            <RacesGrid races={json.races} username={username}/>
        </div>
    )
}