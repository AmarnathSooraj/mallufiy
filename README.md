# Video Streaming Prototype

This project is a **basic video streaming prototype** built with **Next.js 14 (App Router)** and **TypeScript**.  
It focuses on **secure video streaming** using **AES-128 HLS encryption** with **signed URLs** and **authentication**.

---

## Features

- User login system using **Supabase Auth**
- Video catalog page with sample videos
- Watch page with **Video.js** HLS video player
- AES-128 HLS encryption using **ffmpeg**
- Signed video URLs with short expiry
- Secure key server for authorized users only
- Dynamic watermark overlay on video
- Basic analytics logging (play, pause, end)
- **Supabase Database** used for storing user data & analytics

---

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Authentication:** Supabase Auth
- **Database:** Supabase
- **Video Player:** Video.js
- **Styling:** Tailwind CSS
- **Encryption:** AES-128 HLS (`ffmpeg`)

---

## Setup Instructions

### 1. Clone the project

```bash
[git clone https://github.com/AmarnathSooraj/mallufiy.git]
```

### 2. Install dependencies

```bash
npm install
# or
pnpm install
```

### 3. Set environment variables

Create a `.env.local` file and add:

```env
NEXT_PUBLIC_SUPABASE_URL=https://dztqsfjhsaemsnlcilkn.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6dHFzZmpoc2FlbXNubGNpbGtuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzOTk2MjAsImV4cCI6MjA3MTk3NTYyMH0.orjBf4mFK8nb-tgbv14IQsRae1YtWU6I-9MHcHG98aw
```

### 4. Run the development server

```bash
npm run dev
# or
pnpm dev
```

The app will start on **http://localhost:3000**

---

## AES-128 HLS Encryption

### Generate key and encrypt video

```bash
openssl rand 16 > enc.key
echo "enc.key" > enc.keyinfo
echo "enc.key" >> enc.keyinfo
echo "http://localhost:3000/api/keys" >> enc.keyinfo

ffmpeg -i sample.mp4   -hls_time 10   -hls_key_info_file enc.keyinfo   -hls_playlist_type vod   -hls_segment_filename "segment%03d.ts"   output.m3u8
```

This generates:

- `output.m3u8` → Playlist file
- `segment001.ts`, `segment002.ts` → Encrypted video segments
- `enc.key` → Encryption key (served securely)

---

## Deliverables

- Working app with secure video streaming
- Authentication & database using **Supabase**
- Video playback using **Video.js**
- Basic analytics stored in Supabase
