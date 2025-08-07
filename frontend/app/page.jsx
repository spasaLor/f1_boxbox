import LoggedHomepage from "@/ui/homepage/LoggedHomepage";
import NotLoggedHomepage from "@/ui/homepage/notLoggedHomepage";
import { cookies } from "next/headers";

export const metadata={
  title:"F1BoxBox",
  description:"Home page of F1BoxBox"
}

export default async function Home() {
  const cookieStore = await cookies();
  const user = cookieStore.get('username');
  const name = cookieStore.get('name');
  const isLogged = !!user?.value;

  return (
    isLogged ? <LoggedHomepage name={name.value}/> : <NotLoggedHomepage/>
  );
}
