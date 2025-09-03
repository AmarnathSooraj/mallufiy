"use client";

import { useEffect, useState, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { User } from "@supabase/supabase-js";

export default function WatchPage({ params }: { params: { id: string } }) {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [videoSources, setVideoSources] = useState<any[]>([]);

  // ✅ Fetch logged-in user once
  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUser(data.user);
    }
    fetchUser();
  }, [supabase]);

  // ✅ Send analytics (memoized to avoid dependency warnings)
  const sendAnalytics = useCallback(
    async (event: { type: string }) => {
      if (!user) return;
      await supabase.from("analytics").insert([
        {
          user_id: user.id,
          video_id: params.id,
          event_type: event.type,
          created_at: new Date().toISOString(),
        },
      ]);
    },
    [supabase, user, params.id]
  );

  // ✅ Example: track when user and sources are ready
  useEffect(() => {
    if (!user || videoSources.length === 0) return;
    sendAnalytics({ type: "page_load" });
  }, [user, videoSources, sendAnalytics]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        Watching video <span className="text-blue-500">{params.id}</span>
      </h1>

      {/* Example player */}
      <video
        className="mt-4 w-full rounded-lg shadow"
        controls
        onPlay={(e) => sendAnalytics({ type: e.type })}
        onPause={(e) => sendAnalytics({ type: e.type })}
      >
        {videoSources.map((src, idx) => (
          <source key={idx} src={src.url} type={src.type} />
        ))}
      </video>
    </div>
  );
}