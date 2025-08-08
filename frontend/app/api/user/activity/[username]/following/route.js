import { NextResponse } from "next/server";

export async function GET(req,{params}){
    const {limit,offset} = Object.fromEntries(new URL(req.url).searchParams);
    const {username} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/user/activity/"+username+"/following?limit="+limit+"&offset="+offset);
    const json = await res.json();
    if(res.ok)
        return NextResponse.json(json,{status:200});
    return NextResponse.json({message: json.message},{status:500});
} 