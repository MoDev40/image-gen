"use client"
import Image from "next/image";

function Profile({ creditBalance,imageManipulated }:ProfileInterface) {
  return (
    <section className="w-full flex flex-col p-0 space-y-3 lg:space-y-0 lg:space-x-3 lg:flex-row justify-between items-center lg:p-4 ">
    <div className="flex flex-col shadow lg:mt-0 mt-5 bg-white rounded  w-full p-8">
        <p className="p-14-medium font-bold md:p-16-medium">CREDITS AVAILABLE</p>
        <div className="mt-4 flex items-center gap-4">
        <Image
            src="/assets/icons/coins.svg"
            alt="coins"
            width={50}
            height={50}
            className="size-9 md:size-12"
        />
        <h2 className="h2-bold text-dark-600">{creditBalance}</h2>
        </div>
    </div>
    <div className="flex flex-col shadow bg-white rounded  w-full p-8">
        <p className="p-14-medium font-bold md:p-16-medium">IMAGE MANIPULATION DONE</p>
        <div className="mt-4 flex items-center gap-4">
        <Image
            src="/assets/icons/photo.svg"
            alt="coins"
            width={50}
            height={50}
            className="size-9 md:size-12"
        />
        <h2 className="h2-bold text-dark-600">{imageManipulated}</h2>
        </div>
    </div>
    </section>
)}

export default Profile