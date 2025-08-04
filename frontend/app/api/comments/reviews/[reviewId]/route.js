import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req,{params}){
    const data = await req.json();
    const {reviewId} = await params;
    const cookieStore = await cookies();
    const auth = cookieStore.get("connect.sid");

    const res = await fetch(process.env.BACKEND_URL+"/comments/reviews/"+reviewId,{
        method:'POST',
        headers:{
            'Cookie':'connect.sid='+auth.value,
            'Content-type':'application/json'
        },
        body: JSON.stringify(data)
    });
    if(res.ok)
        return NextResponse.json({message:'ok'},{status:200})
    else{
        const json= await res.json();
        console.log(json);
        return NextResponse.json({message:json[0].message},{status:500})
    }


}
export async function GET(req){
    const {reviewId} = await params;

    const res = await fetch(process.env.BACKEND_URL+"/comments/reviews/"+reviewId);
    const json = await res.json()
    if(res.ok)
        return NextResponse.json(json,{status:200});
    return NextResponse.json({message:json.messge},{status:500});
}