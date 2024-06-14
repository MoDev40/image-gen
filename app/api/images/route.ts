import connectToDatabase from "@/lib/database/connectionDatabase";
import Image from "@/lib/database/models/imageModal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
    try {
        await connectToDatabase()

        const images = await Image.find();

        return NextResponse.json({images},{status:200})

    }catch (error) {
        return NextResponse.json({message:"Unexpected error while fetching images data",error},{status:500})
    }
}