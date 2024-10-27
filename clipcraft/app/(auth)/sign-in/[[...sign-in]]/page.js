import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function Page() {
  return (
  <div className='grid grid-cols-1 md:grid-cols-2'>
    <div>
      <Image src={'/login.png'} width={500} height={500} alt='login image' className='w-full object-contain'></Image>
    </div>

    <div className='flex justify-center items-center h-screen'>
      <SignIn />
    </div>
  </div>
)
}