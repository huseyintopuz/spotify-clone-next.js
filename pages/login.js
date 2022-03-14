import React from 'react'
import Image from 'next/image'
import spotifyLogo from '../images/spotify.png'
import { getProviders, signIn } from 'next-auth/react';

const Login = ({ providers }) => {
  
  return (
    <div className='flex flex-col items-center bg-black justify-center	min-h-screen w-full' >
      <Image
      className='rounded-full'
      src={spotifyLogo}
      alt='spotify'
      width='130px'
      height='130px'
      />
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button className='bg-[#6CD965] text-white mt-5 rounded-full px-4 py-2' 
          onClick={() => signIn(provider.id, {callbackUrl: '/'})}>
            Login with {provider.name}
            </button>
        </div>
      ))}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders()
  return {
    props: {
      providers
    }
  }
}

