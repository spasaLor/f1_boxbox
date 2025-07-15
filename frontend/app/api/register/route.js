import { NextResponse } from "next/server";

export async function POST(request){
    const data = await request.json();
    const res = await fetch(process.env.BACKEND_URL+"/register",
        {   
            method:"POST",
            headers:{'content-type':"application/json"},
            body:JSON.stringify({
                mail:data.email,
                username:data.username,
                password:data.password
            })
        }
    );
    const json = await res.json();
    if(!res.ok)
        return NextResponse.json(json,{status:400});
    return(NextResponse.json(json.redirect,{status:200}));
}