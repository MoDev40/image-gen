import connectToDatabase from "@/lib/database/connectionDatabase";
import Image from "@/lib/database/models/imageModal";
import User from "@/lib/database/models/userModal";
import {NextRequest,NextResponse} from "next/server"

type Params = {
    id:string;
} 
export async function GET(req:NextRequest,{params}:{params:Params}){
    try {

        await connectToDatabase()
        const { id } = params;

        const user = await User.findOne({clerkId:id})

        if(!user){
            return NextResponse.json({message:"Unexpected error while fetching data"},{status:500})
        }

        const images = await Image.find({author:user._id}).populate("author").exec()

        return NextResponse.json({creditBalance:user.creditBalance,imageManipulated:images.length},{status:200})
    } catch (error) {
        return NextResponse.json({message:"Unexpected error while fetching data",error},{status:500})
    }
}