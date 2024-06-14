"use client"
import axios from "axios"
import { Button } from "../ui/button"
import { API } from "@/lib/config"
import { Dispatch, SetStateAction, useState } from "react"
import { getCldImageUrl } from "next-cloudinary"

interface SaveImageProps {
  imageData:DBImage
  setImageData:Dispatch<SetStateAction<DBImage | null>>;
}
function SaveImage({imageData,setImageData}: SaveImageProps) {
  const [isSaving,setIsSaving] = useState<boolean>(false)
    async function handleImageSave() {
        setIsSaving(true)
        setImageData({...imageData,transformedUrl:getCldImageUrl({
            width:imageData?.width,
            height:imageData?.height,
            src:imageData?.publicId,
            ...imageData.config
        })})
        await axios.post(`${API}/images/create`,imageData)
        setImageData(null)
        setIsSaving(false)
    }
  return (
    <Button className="w-full" disabled={!imageData || isSaving} type="button" onClick={handleImageSave}>SaveImage</Button>
  )
}

export default SaveImage