import connectToDatabase from "@/lib/database/connectionDatabase";
import Image from "@/lib/database/models/imageModal";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    try {
        await connectToDatabase()

        const body = await req.json();

        const image = new Image(body)

        image.save()

        return NextResponse.json({image},{status:201})

    }catch (error) {
        return NextResponse.json({message:"Unexpected error while inserting image data"},{status:500})
    }

}