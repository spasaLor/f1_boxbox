import { NextResponse } from "next/server";

export async function GET(req,{params}){
    const {username} = await params;
    const {limit, offset} = Object.fromEntries(new URL(req.url).searchParams);

    const res = await fetch(process.env.BACKEND_URL+"/user/following/"+username+"?limit="+limit+"&offset="+offset);
    const data=await res.json();
    if(res.ok)
        return NextResponse.json(data,{status:200})
    else
        return NextResponse.json({message:data.message},{status:500});
}