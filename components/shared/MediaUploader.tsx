"use client"
import { API } from '@/lib/config';
import { skeleton } from '@/lib/utils';
import axios from 'axios';
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "../ui/use-toast";
import { Image as ImageInterface } from "./TranFormationForm";

interface MediaUploaderProps {
  setImage:Dispatch<SetStateAction<ImageInterface>>;
  image:ImageInterface
  onValueChange:(value:string) => void;
  publicId: string;
  user_id:string;
}
function MediaUploader({publicId,image,user_id,setImage,onValueChange}: MediaUploaderProps) {
  const { toast } = useToast()

  async function handleSuccess(result:any) {
    setImage((previous)=> ({
        ...previous,
        width: result?.info?.width,
        height: result?.info?.height,
        secureUrl: result?.info?.secure_url,
        publicId:result?.info?.public_id
    }))

    onValueChange(result?.info?.public_id)
    await axios.put(`${API}/users/${user_id}/decrease`)
    toast({
      title: "Image Uploaded",
      description: "Image uploaded successfully 5 credit has been used", 
      duration: 5000,
      className:"bg-green-400 text-white"
    })
  }

  function handleError(){
    toast({
      title: "Image Upload Failed",
      description: "Image upload failed unexpectedly",
      duration: 5000,
      className:"bg-red-400 text"
    })

  }
  return (
    <CldUploadWidget
    onSuccess={handleSuccess}
    onError={handleError} 
    uploadPreset="ImageGen"
    options={{
      multiple:false,
      resourceType:"image"
    }}>
      {({ open }) =>(
        <div className="flex flex-col gap-4">
          <h3 className="font-bold text-slate-700">
            Original
          </h3>
          {
            publicId ?
            <div className="cursor-pointer overflow-hidden">
            <CldImage
                src={publicId || image?.publicId}
                width={image?.width | 200}
                height={image?.height | 300}
                alt="image/uploaded"
                placeholder={skeleton as PlaceholderValue}
              />
            </div> :
            <div className="flex flex-col justify-center items-center h-24 bg-white shadow p-5 rounded">
              <button type="button" onClick={() => open()}>
                <Image
                src='/assets/icons/add.svg'
                width={24}
                height={24}
                alt="upload-btn"
                />
              </button>
              <span>upload</span>
            </div>
          }
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader