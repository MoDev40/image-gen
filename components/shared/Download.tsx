import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import axios from "axios"

function Download({url}:{url:string}) {
    async function handleDownload(){
        const response = await axios({
            url:url,
            method:'GET',
            responseType:'blob',
        })
        const imageUrl = window.URL.createObjectURL(new Blob([response.data]))

        const link = document.createElement('a')
        link.href = imageUrl

        link.setAttribute('download','transformed.png')
        document.body.appendChild(link)
        link.click()

        document.body.removeChild(link)
        window.URL.revokeObjectURL(imageUrl)
    }
  return (
    <div>
    <Button onClick={handleDownload} type="button" variant="outline">
      <Image 
      src='/assets/icons/download.svg'
      alt="download"
      width={24}
      height={24}
      />
    </Button>
  </div>  )
}

export default Download