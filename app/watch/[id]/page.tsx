'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function WatchPage() {
  const { id } = useParams()
  const videoRef = useRef(null)
  const playerRef = useRef(null)
  const [user, setUser] = useState(null)
  const supabase = createClientComponentClient()

  const videoSources = {
    '1': 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
    '2': 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
  }

  // Fetch logged-in user info
  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser()
      if (data?.user) setUser(data.user)
    }
    fetchUser()
  }, [])

  // Function to send analytics
  async function sendAnalytics(event) {
    if (!user) return
    await supabase.from('analytics').insert([
      {
        user_id: user.id,
        video_id: id,
        event,
      },
    ])
  }

  // Initialize Video.js
  useEffect(() => {
    if (videoRef.current && !playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        fluid: true,
        sources: [
          {
            src: videoSources[id],
            type: 'application/x-mpegURL',
          },
        ],
      })

      const player = playerRef.current
      player.on('play', () => sendAnalytics('play'))
      player.on('pause', () => sendAnalytics('pause'))
      player.on('ended', () => sendAnalytics('ended'))
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose()
        playerRef.current = null
      }
    }
  }, [id, user])

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative">
      <h1 className="text-white text-2xl font-bold mb-4">Now Playing - Movie {id}</h1>

      <div className="w-full max-w-4xl relative">
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered rounded-lg overflow-hidden w-full"
        />

        {user?.email && (
          <div className="absolute top-4 right-4 text-white text-sm opacity-50 pointer-events-none">
            {user.email}
          </div>
        )}
      </div>
    </div>
  )
}
