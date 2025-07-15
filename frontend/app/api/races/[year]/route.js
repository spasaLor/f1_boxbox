import { NextResponse } from "next/server";

export async function GET(req,{params}){
    const {year} = await params;
    const res = await fetch(process.env.BACKEND_URL+"/races/"+year);
    const json = await res.json();
    if(res.ok)
        return NextResponse.json(json,{status:200});
    return NextResponse.json(json,{status:500});
}