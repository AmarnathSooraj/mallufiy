'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import supabase from '@/lib/client' // adjust if your supabase client is elsewhere

export default function WatchPage() {
  const params = useParams()
  const id = params?.id as string // ✅ cast instead of using `:`

  const [user, setUser] = useState<any>(null)
  const [videoSources, setVideoSources] = useState<string[]>([])

  // Get logged-in user
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  // Fetch video
  useEffect(() => {
    if (!id) return
    setVideoSources([
      `/videos/${id}/1080p.m3u8`,
      `/videos/${id}/720p.m3u8`
    ])
  }, [id])

  // Send analytics
  const sendAnalytics = async (event: { type: string }) => {
    if (!user || !id) return
    await supabase.from('analytics').insert([
      {
        user_id: user.id,
        video_id: id, // ✅ no more params.id
        event_type: event.type,
        created_at: new Date().toISOString()
      }
    ])
  }

  // Attach video listeners
  useEffect(() => {
    const video = document.getElementById('video-player') as HTMLVideoElement | null
    if (!video) return

    const handlePlay = () => sendAnalytics({ type: 'play' })
    const handlePause = () => sendAnalytics({ type: 'pause' })
    const handleEnded = () => sendAnalytics({ type: 'ended' })

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)
    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      video.removeEventListener('ended', handleEnded)
    }
  }, [user, id, videoSources])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Watching Video {id}</h1>
      {videoSources.length > 0 ? (
        <video
          id="video-player"
          className="w-full max-w-4xl rounded-lg"
          controls
          src={videoSources[0]}
        />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  )
}