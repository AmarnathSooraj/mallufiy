'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const movies = [
  {
    id: '1',
    title: 'Sample Movie 1',
    poster: '/posters/movie1.jpg',
  },
  {
    id: '2',
    title: 'Sample Movie 2',
    poster: '/posters/movie2.jpg',
  },
]

export default function CatalogPage() {
  const supabase = createClientComponentClient()
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) setUserEmail(user.email ?? "")
    }
    fetchUser()
  }, [])

  return (
    <div className="min-h-screen bg-[#fefefe]">
      <Navbar />
      <h2 className="text-lg text-center mt-4 text-gray-700">
        Welcome, {userEmail || 'Guest'}
      </h2>
      <h1 className="text-3xl font-bold my-8 text-center font-[Poppins]">
        Movie Catalog
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {movies.map((movie) => (
          <Link
            key={movie.id}
            href={`/watch/${movie.id}`}
            className="bg-gray-900 text-amber-50 rounded-sm overflow-hidden shadow-lg hover:scale-105 transition-transform"
          >
            <div className="relative w-full h-64">
              <Image
                src={movie.poster}
                alt={movie.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{movie.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
