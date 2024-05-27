import React from 'react'

function Layout({children}:{children:React.ReactNode}) {
  return (
    <main className='flex flex-col justify-center items-center h-screen mx-auto max-w-[1120px]'>{children}</main>
  )
}

export default Layout