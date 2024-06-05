import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "../ui/use-toast";
import { Image as ImageInterface } from "./AddTranFormationForm";

interface MediaUploaderProps {
    setImage:Dispatch<SetStateAction<ImageInterface>>;
    onValueChange:(value:string) => void;
    imageURL:string;
    publicId: string;
}
function MediaUploader({publicId,imageURL,setImage,onValueChange}: MediaUploaderProps) {
  const { toast } = useToast()

  function handleSuccess(result:any) {
    setImage((previous)=> ({
        ...previous,
        width: result?.info?.width,
        height: result?.info?.height,
        secureURL: result?.info?.secure_url,
        publicId:result?.info?.public_id
    }))

    onValueChange(result?.info?.public_id)

    toast({
      title: "Image Uploaded",
      description: "Image uploaded successfully 1 credit has been used", 
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
          <h3 className="h3-bold text-dark-600">
            Original
          </h3>
          {
            publicId ?
            <div className="cursor-pointer overflow-hidden rounded-[10px]">
            <CldImage
                src={publicId || imageURL}
                width={250}
                height={200}
                alt="image/uploaded"
              />
            </div> :
            <div className="flex flex-col justify-center items-center h-auto bg-white shadow p-5 rounded">
              <button type="button" onClick={() => open()}>
                <Image
                src='/assets/icons/add.svg'
                width={20}
                height={120}
                alt="upload-btn"
                />
              </button>
              <p>Click button to upload image</p>
            </div>
          }
        </div>
      )}
    </CldUploadWidget>
  )
}

export default MediaUploader