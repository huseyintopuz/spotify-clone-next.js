import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { DownOutlined, LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { Button } from 'antd';
import { shuffle } from 'lodash'
import spotifyApi from '../../lib/spotify';
import { millisToMinutesAndSeconds } from '../../lib/time'
import Songs from '../../components/Songs'
import { StoreContext } from '../../context/context';

const colors = [
  "from-indigo-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
  "from-purple-500",
  "from-gray-500",
  "from-violet-500"
]

const Center = () => {
  const router = useRouter();

  const { data: session } = useSession();
  const [color, setColor] = useState(null);
  const { playlistId } = useContext(StoreContext)
  const { playlist, setPlaylist, logout, setLogout } = useContext(StoreContext)
  const disabled = router.pathname === '/'
  console.log(router.pathname)
  let millis = playlist?.tracks.items.map(item => item.track.duration_ms)
  millis = millis ? millis.reduce((a, b) => a + b, 0) : 0;

  useEffect(() => {
    setColor(shuffle(colors).pop())
  }, [playlistId])

  useEffect(() => {
    spotifyApi.getPlaylist(playlistId).then((data) => {
      setPlaylist(data.body)

    }).catch(err => console.log("something went wrong", err))
  }, [spotifyApi, playlistId])

  return (
    <div style={{ width: '1064px' }} className='h-screen overflow-y-scroll' >
      <section
        className={`bg-gradient-to-b
          to-black ${color} h-96 text-white px-8 space-y-8 `}
      >
        <header className='sticky top-0 pt-4'>
          <div className='flex items-center justify-between '>
            <div className='space-x-4'>
              <button type='button' className={disabled ? 'disabledButton' : 'enabledButton'}>
                <LeftCircleFilled
                  type='button'
                  className='text-3xl cursor-pointer'
                  style={{ color: 'rgb(31 41 55)' }}
                />
              </button>
              <button type='button' className={disabled ? 'disabledButton' : 'enabledButton'}>
                <RightCircleFilled
                  type='button'
                  className='text-3xl cursor-pointer '
                  style={{ color: 'rgb(31 41 55)' }}
                />
              </button>
            </div>
            <div className='flex space-x-6'>
              <Button type="primary" shape="round" style={{ background: 'black', padding: '4px 32px', border: '1px solid rgb(209 213 219)', }}
                className='update'
              >
                UPDATE
              </Button>
              <div onClick={() => setLogout(!logout)}
                className='flex items-center bg-red-300 space-x-3  
                          rounded-full cursor-pointer opacity-90 hover:opacity-80 p-0'
              >
                <img
                  className='w-6 h-6 rounded-full p-0'
                  src={session?.user?.image}
                  alt={session?.user?.name}
                />
                <span className='text-white hidden md:inline'>{session?.user.name}</span>
                <DownOutlined className='text-white text-sm pr-2 hidden md:inline' />
              </div>
              {logout &&
                <div className='bg-gray-800 rounded fixed mt-8 right-11 text-white px-2 py-2 '>
                  <div className='text-left pl-2 pr-20 py-1 hover:bg-gray-600 cursor-pointer'>Profile</div>
                  <div className='text-left pl-2 pr-20 py-1 hover:bg-gray-600 cursor-pointer' onClick={() => signOut()}>Sign Out</div>
                </div>
              }
            </div>
          </div>
        </header>
        <div className='flex '>
          <img className='w-60 h-60' src={playlist?.images[0].url} />
          <div className='flex flex-col justify-end space-y-2 ml-5 h-60'>
            <h4 className='text-sm font-bold'>PLAYLIST</h4>
            <h1 className='w-full text-5xl font-bold cursor-pointer m-0 sm:text-7xl'>{playlist?.name}</h1>
            <div className='flex items-center space-x-1 text-sm'>
              <span className='hover:underline cursor-pointer sm:inline-flex'>{playlist?.owner?.display_name}</span>
              <span className='w-1 h-1 bg-white rounded-full ' />
              <span className=''>{playlist?.tracks?.total} songs,</span>
              <span>{millisToMinutesAndSeconds(millis)}</span>
            </div>
          </div>
        </div>
      </section>

      <Songs />

    </div>
  )
}

export default Center