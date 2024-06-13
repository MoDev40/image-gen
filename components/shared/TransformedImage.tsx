"use client"
import { skeleton } from "@/lib/utils";
import { CldImage, getCldImageUrl } from "next-cloudinary";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { Image as ImageInterface } from "./AddTranFormationForm";
import Download from "./Download";

interface TransFormedProps {
  image:ImageInterface;
  transformationConfig:{
    [key: string]:any
  };
  isTransforming:boolean;
  setIsTransforming:Dispatch<SetStateAction<boolean>>;
}
function TransformedImage({image,transformationConfig,isTransforming,setIsTransforming}:TransFormedProps) {

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
          <h1 className="font-bold text-slate-700">Transformed</h1>
          { image?.publicId && transformationConfig &&
            <Download
            url={getCldImageUrl({
              width: image?.width,
              height: image?.height,
              src: image?.publicId,
              ...transformationConfig
            })}
          />
        } 
      </div>
      { image?.publicId && transformationConfig ?
        <div className="cursor-pointer overflow-hidden">
            <CldImage
              src={image.publicId}
              width={image?.width}
              height={image?.height}
              alt="image/transformed"
              placeholder={skeleton as PlaceholderValue}
              onError={()=>{
                setIsTransforming(false);
              }}
              onLoad={()=>{
                setIsTransforming(false)
              }}
              {...transformationConfig}
          />
          {
            isTransforming && 
            <div>
              <Image
              src="/assets/icons/spinner.svg"
              alt="spinner"
              width={24}
              height={24}
              />
            </div>
          }
        </div> :
        <div className="flex flex-col justify-center items-center h-24 bg-white shadow p-5 rounded">
          <h2>Transformed image</h2>
        </div> 
      }
    </div>
  )
}

export default TransformedImage