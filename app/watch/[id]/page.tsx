'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function WatchPage() {
  const params = useParams<{ id: string }>() // ✅ get /watch/[id]
  const [user, setUser] = useState<any>(null)
  const [videoSources, setVideoSources] = useState<string[]>([])

  // ✅ fetch user session
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user }
      } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  // ✅ fetch video sources (replace with your own logic)
  useEffect(() => {
    if (!params?.id) return
    const fetchVideo = async () => {
      // Example: fetch video URLs from Supabase or API
      setVideoSources([
        `/videos/${params.id}/1080p.m3u8`,
        `/videos/${params.id}/720p.m3u8`
      ])
    }
    fetchVideo()
  }, [params?.id])

  // ✅ send analytics (play, pause, etc.)
  const sendAnalytics = async (event: { type: string }) => {
    if (!user || !params?.id) return
    await supabase.from('analytics').insert([
      {
        user_id: user.id,
        video_id: params.id,
        event_type: event.type,
        created_at: new Date().toISOString()
      }
    ])
  }

  // ✅ track video events
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
  }, [user, params?.id, videoSources])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-2xl font-bold mb-4">Watching Video {params?.id}</h1>
      {videoSources.length > 0 ? (
        <video
          id="video-player"
          className="w-full max-w-4xl rounded-lg"
          controls
          src={videoSources[0]} // default source
        />
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  )
}