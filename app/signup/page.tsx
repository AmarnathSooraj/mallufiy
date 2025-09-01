
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { signup } from '../login/actions'


export default function Page() {
  return (
    <div className="relative flex items-center justify-center min-h-screen">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/imagebg1.webp"
          alt="Background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Form */}
  <div className="min-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
  <form className="flex flex-col  h-[300px] justify-center gap-6">
    {/* Email */}
    <div className="flex flex-col">
      <label
        htmlFor="email"
        className="mb-2 text-sm font-medium text-gray-700"
      >
        Email
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        className="px-4 py-2 border border-gray-300 rounded-sm  focus:outline-none"
      />
    </div>

    {/* Password */}
    <div className="flex flex-col">
      <label
        htmlFor="password"
        className="mb-2 text-sm font-medium text-gray-700"
      >
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        required
        className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none"
      />
    </div>

    {/* Buttons */}
    <div className="flex gap-4">

      <button
        formAction={signup}
        className="flex-1 bg-[#c11c1c] text-[#fefefe] py-2 px-4 rounded-sm border transition"
      >
        Sign up
      </button>
    </div>
    <Link href="login" className='text-gray-500'>Already have an account?</Link>
  </form>
  </div>
    </div>
  )
}
