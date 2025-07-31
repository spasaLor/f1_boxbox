import PopularLists from "@/ui/lists/popularLists";
import { cookies } from "next/headers";
import Link from "next/link";

export default async function Page(){
    const cookieStore = await cookies();
    const user = cookieStore.get('username');
    const popularPromise = fetch(process.env.BACKEND_URL+"/lists/popular",{next:{revalidate:600}});
    const recentPromise = fetch(process.env.BACKEND_URL+"/lists/recently_liked");
    const [popRes,recRes] = await Promise.all([popularPromise,recentPromise]);
    const jsonPop = await popRes.json();
    const jsonRec = await recRes.json();

    return(
        <div className="main">
            <div className="header">
                <p>Collect, curate, and share. Lists are the perfect way to group films.</p>
                <Link href={ user ? "/"+user.value+"/lists/new" : '#'}>Start your own list</Link>
            </div>
            <section className="popular">
                <PopularLists data={jsonPop} />
            </section>
            <section className="recently">
                
            </section>
        </div>
    )
}