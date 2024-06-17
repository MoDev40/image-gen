"use client"
import axios from "axios"
import Image from 'next/image'

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
    <button onClick={handleDownload} type="button">
      <Image 
      src='/assets/icons/download.svg'
      alt="download"
      width={24}
      height={24}
      />
    </button>
  </div>  )
}

export default Download