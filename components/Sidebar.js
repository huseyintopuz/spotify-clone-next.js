import React, { useContext, useEffect, useState } from 'react'
import SideLink from './SideLink'
import Image from 'next/image'
import spotifyLogo from '../images/spotify2.png'
import Link from 'next/link'
import {
  HomeFilled,
  SearchOutlined,
  InsertRowRightOutlined,
  PlusSquareOutlined,
  HeartOutlined
} from '@ant-design/icons'
import { useSession } from 'next-auth/react'
import useSpotify from '../hooks/useSpotify'
import { StoreContext } from '../context/context'

const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession();
 
  const [playlists, setPlaylists] = useState([]);
  const { setPlaylistId } = useContext(StoreContext)

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then(data => {
        setPlaylists(data.body.items)
      })
    }
  }, [session, spotifyApi])

  const sidebarLinks = [
    {
      icon: HomeFilled,
      name: 'Home',
      link: ''
    },
    {
      icon: SearchOutlined,
      name: 'Search',
      link: 'search'
    },
    {
      icon: InsertRowRightOutlined,
      name: 'My Library',
      link: 'mylibrary'
    },
    {
      icon: PlusSquareOutlined,
      name: 'Create Playlist',
      link: 'createplaylist'
    },
    {
      icon: HeartOutlined,
      name: 'Liked Songs',
      link: 'likedsongs'
    }
  ]

  return (
    <div className='w-52 md:w-56 lg:80 p-5 text-xs lg:text-sm text-gray-500 border-r
     border-gray-900 overflow-y-scroll scrollbar-hide h-screen '>
      <div className='flex items-center space-x-2 mb-6'>
        <Image
          className='rounded-full'
          src={spotifyLogo}
          alt='spotify'
          width='40px'
          height='40px'
        />
        <h1 className='text-white text-xl m-0 font-bold'>Spotify*</h1>
      </div>

      {sidebarLinks.map(({ name, icon, link }) => {
        return (
          <ul key={name} className='mb-0'>
            <Link href={`/${link}`} passHref>
              <SideLink name={name} Icon={icon} />
            </Link>
          </ul>
        )
      })}

      <hr className='bg-gray-900' />

      {playlists?.map(playlist => {
        return (
          <ul key={playlist.id}>
            <Link href={'/playlist/' + playlist.id }  passHref>
              <a className='text-gray-500'><li className='cursor-pointer hover:text-white mt-4' onClick={() => setPlaylistId(playlist.id)}>{playlist.name}</li></a>
            </Link>
          </ul>
        )
      })}

    </div >
  )
}

export default Sidebar