import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "../ui/use-toast";
import { Image as ImageInterface } from "./AddTranFormationForm";
import { skeleton } from '@/lib/utils';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';

interface MediaUploaderProps {
    setImage:Dispatch<SetStateAction<ImageInterface>>;
    image:ImageInterface
    onValueChange:(value:string) => void;
    publicId: string;
}
function MediaUploader({publicId,image,setImage,onValueChange}: MediaUploaderProps) {
  const { toast } = useToast()

  function handleSuccess(result:any) {
    setImage((previous)=> ({
        ...previous,
        width: result?.info?.width,
        height: result?.info?.height,
        secureUrl: result?.info?.secure_url,
        publicId:result?.info?.public_id
    }))

    onValueChange(result?.info?.public_id)

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
    // uploadPreset="ImageGen"
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
                width={image?.width}
                height={image?.height}
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
              <p>upload image</p>
            </div>
          }
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader