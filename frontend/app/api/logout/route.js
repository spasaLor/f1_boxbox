import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req){
    const cookieStore = await cookies();
    cookieStore.delete('connect.sid');
    const res = await fetch(process.env.BACKEND_URL+"/logout");
    const json = await res.json();
    if(res.ok){
        return NextResponse.json(json,{status:res.status});
    }
    console.log(json);
}