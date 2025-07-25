import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    const cookieStore = await cookies();
    const auth= cookieStore.get('connect.sid');
    if(!auth)
        return NextResponse.json({message:"Unauthorized"},{status:401});
    const data = await req.json();
    const res = await fetch(process.env.BACKEND_URL+"/reviews/likes/"+data.reviewId,{
        method:'POST',
        headers:{
            'Cookie':'connect.sid='+auth.value
        }
    });

    if(res.ok)
        return NextResponse.json({message:'ok'},{status:200});
    else
        return NextResponse.json({message:'error'},{status:500});
}

export async function GET(req){
    const data = await req.json();
    const res = await fetch(process.env.BACKEND_URL+"/reviews/likes/"+data.reviewId);
    const json = await req.json();
    if(res.ok)
        return NextResponse.json(json,{status:200});
    else
        return NextResponse.json(json,{status:500});
}

export async function DELETE(req){
    const cookieStore = await cookies();
    const auth= cookieStore.get('connect.sid');
    if(!auth)
        return NextResponse.json({message:"Unauthorized"},{status:401});
    const data = await req.json();
    const res = await fetch(process.env.BACKEND_URL+"/reviews/likes/"+data.reviewId,{
        method:'DELETE',
        headers:{
            'Cookie':'connect.sid='+auth.value
        }
    });
    if(res.ok)
        return NextResponse.json({message:'ok'},{status:200});
    else
        return NextResponse.json({message:'error'},{status:500});
}