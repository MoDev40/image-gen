"use client"
import { skeleton } from '@/lib/utils';
import { CldImage, getCldImageUrl } from 'next-cloudinary';
import { PlaceholderValue } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';
import Download from './Download';

interface TransFormedProps {
  image:ImageInterface;
}
function TransformedImage({ image } : TransFormedProps) {
  const router = useRouter()
  return (
    <div className='w-full flex flex-col gap-4 p-4'>
      <div className='flex flex-col'>
        <h1 className='font-bold text-2xl'>{image.title}</h1>
        <h3 className='font-normal text-xl'>type {image.transformationType}</h3>
      </div>
      <div className='flex flex-row space-x-3 items-center justify-between'>
        <div className='flex flex-col gap-4'>
        <h3 className="font-bold text-slate-700">Original</h3>
              <CldImage
                src={image?.publicId}
                width={image?.width}
                height={image?.height}
                alt="image/original"
                placeholder={skeleton as PlaceholderValue}
              />
        </div>
        <div className='flex flex-col gap-4'>
          <div className="flex flex-row items-center justify-between">
            <h1 className="font-bold text-slate-700">Transformed</h1>
              <Download
                url={getCldImageUrl({
                  width: image?.width,
                  height: image?.height,
                  src: image?.publicId,
                  ...image.config
              })}
            />
          </div>
          <Image src={getCldImageUrl({
            width:image?.width,
            height:image?.height,
            src:image?.publicId,
            ...image.config
            })} 
            alt={image.publicId} placeholder={skeleton as PlaceholderValue} width={image.width} height={image.height} />
        </div>
      </div>
      <div className='flex flex-col space-y-3'>
        <Button onClick={()=>{
          router.push(`/transformations/${image._id}/update`)
        }} className='w-full'>Update</Button>
        <Button variant="destructive" className='w-full'>Delete</Button>
      </div>      
    </div>
  )
}

export default TransformedImage