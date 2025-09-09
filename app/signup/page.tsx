'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {useState} from 'react'

import { connectDB } from '@/utils/db'
import {useSession, signIn, signOut} from 'next-auth/react'


export default function Page() {

    const db = connectDB()
    const { data : session }=useSession()
    console.log(session)

    const [signUp,setSignUp]=useState({
      name:'',
      email:'',
      password:'',
      confirmpassword:''
    })

    const [status,setStatus]=useState('')

    const handleChange =(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
      
        e.preventDefault();
        const {name,value} = e.target;
        setSignUp((prev)=>({...prev,[name]:value}));
    }
    
      const handleSubmit = async (e: React.FormEvent) =>{

        e.preventDefault();
        const { name, email, password, confirmpassword} = signUp;

        if(!name || !email || !password || !confirmpassword){
          setStatus('All fields are required');
          return;
        }

        if(password !== confirmpassword){
          setStatus('Password does not match');
          return
        }
        try{
          const resUserExists = await fetch('/api/userExists',{
            method:'POST',
            headers:{
              "Content-Type":"application/json"
            },
            body: JSON.stringify({email})
          })

          const { user } = await resUserExists.json();

          if(user){
            setStatus('This user already exits');
            return
          }

          const res = await fetch('/api/signup',{
            method:'POST',
            headers:{
               "Content-Type":"application/json"
              },
            body: JSON.stringify({
              name,
              email,
              password,
            })
          })
        }
        catch(err){
          console.log(err)
        }
      }
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
  <div className="min-w-md mx-auto bg-[#efefef] p-6 rounded-xl shadow-lg space-y-6">
     <button
        className="flex-1  text-[#595757] border-[#464545] w-full py-2 px-4 rounded-sm border transition"
        onClick={()=>signIn('google')}
      >
        Sign up with Google
      </button>
      {/* <button onClick={()=>signOut()}>sign Out</button> */}
      <hr/>

  <form 
    onSubmit={handleSubmit}
    className="flex flex-col justify-center gap-4">

    <div className="flex flex-col">
      <label
        htmlFor="name"
        className="mb-2 text-sm font-medium text-gray-700"
      >
        Full Name
      </label>
      <input
        id="name"
        name="name"
        type="text"
        value={signUp.name}
        onChange={handleChange}
        required
        className="px-4 py-2 border border-gray-300 rounded-sm  focus:outline-none"
      />
    </div>

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
        value={signUp.email}
        onChange={handleChange}
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
        value={signUp.password}
        onChange={handleChange}
        required
        className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none"
      />
    </div>
    <div className="flex flex-col">
      <label
        htmlFor="confirmpassword"
        className="mb-2 text-sm font-medium text-gray-700"
      >
        Confirm Password
      </label>
      <input
        id="confirmpassword"
        name="confirmpassword"
        type="password"
        value={signUp.confirmpassword || ''}
        onChange={handleChange}
        required
        className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none"
      />
    </div>
    {status && <p className='text-sm text-red-700'>{status}</p>}
    <div className="flex gap-4">

      <button
        type='submit'
        className="flex-1 bg-[#c11c1c] text-[#fefefe] py-2 px-4 rounded-sm border transition"
        // onClick={()=>signIn()}
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
