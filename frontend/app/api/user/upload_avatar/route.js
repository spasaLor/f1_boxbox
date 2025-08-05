import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req){
    const cookieStore = await cookies();
    const auth = cookieStore.get('connect.sid');
    const formData = await req.formData();
    const file = formData.get("propic");
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename=file.name;

    const fD = new FormData();
    fD.append('propic', new Blob([buffer]), filename);

    const res = await fetch(process.env.BACKEND_URL+"/user/upload_pic",{
        method:'POST',
        headers:{'Cookie':'connect.sid='+auth.value},
        body: fD
    });
    if(res.ok)
        return NextResponse.json({message:"Ok"},{status:200})
    else
        return NextResponse.json({message:"Error"},{status:500})

}