import connectToDatabase from "@/lib/database/connectionDatabase";
import Image from "@/lib/database/models/imageModal";
import { NextRequest, NextResponse } from "next/server";

type Params = {
    id:string;
}
export async function PUT(req:NextRequest,{params}:{params:Params}) {
    try {
        await connectToDatabase()
        const body = await req.json();

        const image = await Image.findByIdAndUpdate(params.id,body);

        return NextResponse.json({image},{status:200})

    }catch (error) {
        return NextResponse.json({message:"Unexpected error while fetching images data",error},{status:500})
    }
}