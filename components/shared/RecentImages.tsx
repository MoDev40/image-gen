"use client"
import { ImageDocument } from "@/lib/database/models/imageModal"
import { skeleton } from "@/lib/utils"
import { getCldImageUrl } from "next-cloudinary"
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props"
import Image from "next/image"
import Link from "next/link"

function RecentImages({ images }: { images:ImageDocument[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {
          images.map((image) => (
          <Link href={`/transformations/${image._id}`}>
            <Image src={getCldImageUrl({
            width:image?.width,
            height:image?.height,
            src:image?.publicId,
            ...image.config
            })} 
            alt={image.publicId} placeholder={skeleton as PlaceholderValue} width={image.width} height={image.height} />
          </Link>
          ))
        }
    </div>
  )
}

export default RecentImages