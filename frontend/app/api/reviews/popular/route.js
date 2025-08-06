import { NextResponse } from "next/server";

export async function GET(req){
    const { name, season, offset } = Object.fromEntries(new URL(req.url).searchParams);
    const res = await fetch(process.env.BACKEND_URL+"/reviews/popular/?name="+name+"&season="+season+"&offset="+offset);
    const json= await res.json();
    if(res.ok)
        return NextResponse.json(json,{status:200});
    return NextResponse.json({message:json.message},{status:500});

}