import AvatarSelector from "@/ui/profile/AvatarSelector";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export default async function Page(){
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    if(!auth)
        redirect("/");
    const res = await fetch(process.env.BACKEND_URL+"/user",{
        headers:{"Cookie":"connect.sid="+auth.value}
    });
    const json = await res.json();
    return(
        <AvatarSelector data={json.user}/>
    )
}