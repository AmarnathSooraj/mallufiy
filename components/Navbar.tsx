'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";

export default function Navbar() {
  const [Nav,setNav]=useState(false);

  const handleNav=()=>{
    setNav(!Nav)
  }
  return (
    <nav className='bg-[#131313] text-[#fefefe] '>
        <div className='flex items-center justify-between p-8 md:px-20 '>
            <h1 className='uppercase font-[Caveat] text-2xl'>Malluify.</h1>
            <div className='hidden sm:flex text-sm uppercase justify-between space-x-10'>
                <Link href='#'>Home</Link>
                <Link href='#'>Movies</Link>
                <Link href='#'>Tv Shows</Link>
                <Link href='#'>Browse</Link>
            </div>
            <div className='text-3xl sm:hidden' onClick={handleNav}>
              {!Nav?<HiOutlineBars3CenterLeft/>:<IoMdClose />}
            </div>
            <div className='hidden sm:block'>
                <Link href='#' className='border p-2 text-sm rounded-sm'>LOG OUT</Link>
            </div>
        </div>
        {/* {Nav&&(
          <div className='fixed z-100 right-0 min-h-screen w-[50%] bg-amber-300 text-black flex items-center'>
            <div className='flex flex-col text-white px-8 space-y-16 text-lg'>
                    <Link href='#'>Home</Link>
                    <Link href='#'>Movies</Link>
                    <Link href='#'>Tv Shows</Link>
                    <Link href='#'>Browse</Link>
            </div>
        </div>
        )} */}
    </nav>
  )
}
