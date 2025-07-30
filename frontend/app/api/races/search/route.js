import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.json();
    const res = await fetch(process.env.BACKEND_URL+"/races/search?q="+data.search);
    const json = await res.json();
    if(res.ok)
        return NextResponse.json(json,{status:200});
    return NextResponse.json(json,{status:500});
}