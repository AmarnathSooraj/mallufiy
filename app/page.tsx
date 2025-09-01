import Navbar from '@/components/Navbar'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="fixed min-h-screen w-full">
      {/* <Navbar /> */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/shuttle.webp"
          alt="bgimg"
          fill
          className="object-cover brightness-30 fixed"
          priority
        />
      </div>
      <div className='absolute bottom-70 text-center left-1/2 -translate-x-1/2'>
        <p className='text-[#fefefe] text-2xl sm:text-4xl'>Enjoy your favorite Malayalam movies with family and friends – anytime, anywhere, without limits.</p>
      </div>
      <div className="absolute bottom-22 left-1/2 -translate-x-1/2 text-[#d6d4d4]">
        <Link
          href="signup"
          className="bg-[#940505] px-10 py-4 sm:px-16 rounded-sm"
        >
          Get Start
        </Link>
      </div>
    </div>
  );
}
