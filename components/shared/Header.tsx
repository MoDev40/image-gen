"use client"

interface Params {
    title:string;
    subtitle?:string;
}
function Header({title,subtitle}:Params) {
  return (
    <div className='bg-indigo-200 p-8 rounded w-full'>
        <h2 className='text-2xl font-bold'>{title}</h2>
        <h4>{subtitle}</h4>
    </div>
  )
}

export default Header