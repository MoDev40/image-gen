"use client"
import { API } from "@/lib/config"
import axios from "axios"
import { getCldImageUrl } from "next-cloudinary"
import { useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useState } from "react"
import { Button } from "../ui/button"
import { toast } from "../ui/use-toast"

interface SaveImageProps {
  imageData:DBImage;
  action:string;
  id:string;
  setImageData:Dispatch<SetStateAction<DBImage | null>>;
}
function SaveImage({imageData,setImageData,action,id}: SaveImageProps) {
  const [isSaving,setIsSaving] = useState<boolean>(false)
  const router = useRouter()
    async function handleImageSave() {
        setIsSaving(true)
        setImageData({...imageData,transformedUrl:getCldImageUrl({
            width:imageData?.width,
            height:imageData?.height,
            src:imageData?.publicId,
            ...imageData.config
        })})

        action === "Add" ? 
        await axios.post(`${API}/images/create`,imageData) :
        await axios.put(`${API}/images/${id}/update`,imageData)
        toast({
            title:`Image ${ action === "Add" ? "Saved" : "Updated"}`,
            description:"Your image has been saved",
            duration:3000,
            className:"bg-green-400 text-white"
        })

        setImageData(null)
        setIsSaving(false)
        router.push("/")
    }
  return (
    <Button className="w-full" disabled={!imageData || isSaving} type="button" onClick={handleImageSave}>SaveImage</Button>
  )
}

export default SaveImage