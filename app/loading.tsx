import Image from 'next/image'
import React from 'react'

function Loading() {
  return (
    <div className='flex flex-col h-screen justify-center items-center container mx-auto'>
      <Image
        src="/assets/icons/spinner.gvg"
        alt="spinner"
        width={24}
        height={24}
      />
    </div>
  )
}

export default Loading