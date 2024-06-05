import { Dispatch, SetStateAction } from "react";
import { Image as ImageInterface } from "./AddTranFormationForm";
import { CldImage, CldUploadWidget } from 'next-cloudinary';
import Image from "next/image";
import { useToast } from "../ui/use-toast";

interface MediaUploaderProps {
    secureURL: string;
    setImage:Dispatch<SetStateAction<ImageInterface>>;
    onValueChange:(value:string) => void;
    publicId: string;
}
function MediaUploader({publicId,secureURL,setImage,onValueChange}: MediaUploaderProps) {
  const { toast } = useToast()

  function handleSuccess(result:any) {
    setImage((previous)=> ({
        ...previous,
        width: result.info.width,
        height: result.info.height,
        secureURL: result.info.secure_url,
    }))

    onValueChange(result.info.publicId)

    toast({
      title: "Image Uploaded",
      description: "Image uploaded successfully",
      duration: 5000,
      className:"bg-green-400"
    })
  }

  function handleError(){
    toast({
      title: "Image Upload Failed",
      description: "Image upload failed unexpectedly",
      duration: 5000,
      className:"bg-red-400"
    })

  }
  return (
    <CldUploadWidget
    onSuccess={handleSuccess}
    onError={handleError} 
    uploadPreset="<Your Upload Preset>">
      {({ open }) =>(
        <div>
          {
            publicId ?
            <div>
              <CldImage
                src={secureURL}
                alt="image/uploaded"
              />
            </div> :
            <div className="flex flex-col justify-center items-center h-auto bg-white shadow p-5 rounded">
              <button onClick={() => open()}>
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