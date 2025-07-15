import { NextResponse } from "next/server";

export async function POST(req){
    const data = await req.json();
    const res = await fetch(process.env.BACKEND_URL+"/login",{
        method:'POST',
        headers:{
            "content-type":"application/json",
        },
        body:JSON.stringify({username:data.username,password:data.password})
    });
    const json = await res.json();
    if(res.ok){
        const setCookie = res.headers.get('set-cookie');
        const response = NextResponse.json(json);
        if (setCookie) {
            response.headers.set('set-cookie', setCookie);
            return response;
        }
    }
    else
        return NextResponse.json(json,{status:400});
}