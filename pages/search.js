import React, { useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'
import { DownOutlined, LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import { Input } from 'antd';
import spotifyApi from '../lib/spotify';
import { millisToMinutesAndSecondsWithoutExplanation } from '../lib/time'
import { StoreContext } from '../context/context'

const Search = () => {
  const router = useRouter();
  const { searchResults, setSearchResults, logout, setLogout } = useContext(StoreContext)

  const { Search } = Input
  const { data: session } = useSession();
  const [search, setSearch] = useState()
  const disabled = router.pathname === '/search'

  useEffect(() => {
    if (!search) return setSearchResults([])
    if (spotifyApi.getAccessToken()) {
      let cancel = false
      spotifyApi.searchTracks(search).then(data => {
        if (cancel) return
        setSearchResults(
          data.body.tracks.items.map(track => {
            const smallestAlbumImage = track.album.images.reduce(
              (smallest, image) => {
                if (image.height < smallest.height) return image
                return smallest
              },
              track.album.images[0]
            )

            const mostPopular = (Math.max(...track.popularity.toString())) // çalışmıyor

            if (mostPopular) {
              return {
                artist: track.artists[0].name,
                title: track.name,
                uri: track.artists[0].uri,
                url: smallestAlbumImage.url,
                popularity: mostPopular,
                duration: track.duration_ms,
                album: track.album.name
              }
            }

          }))
      }).catch(err => console.log("something went wrong", err))
    }
    return () => (cancel = true)
  }, [search, spotifyApi.accessToken])

  return (
    <div style={{ width: '1064px' }} className=' h-screen overflow-y-scroll text-white'>
      <header className='sticky top-0 px-8 pt-4'>
        <div className='flex items-center justify-between '>
          <div className='flex space-x-4'>
            <LeftCircleFilled
              className='text-3xl cursor-pointer'
              style={{ color: 'rgb(31 41 55)' }}
              onClick={() => router.back()} />
            <button type="button" className={disabled ? 'disabledButton' : 'enabledButton'}>
              <RightCircleFilled
                type='button'
                className='text-3xl'
                style={{ color: 'rgb(31 41 55)' }}
              />
            </button>
            <div className='rounded-md' ><Search placeholder="input search text" value={search} onChange={(e) => setSearch(e.target.value)} enterButton /></div>
          </div>
          <div className='flex space-x-6'>
            <div onClick={() => setLogout(!logout)}
              className='flex items-center bg-black space-x-3 h-8   
                          rounded-full cursor-pointer opacity-90 hover:opacity-80 p-0'
            >
              <img
                className='w-6 h-6 rounded-full p-0'
                src={session?.user?.image}
                alt={session?.user?.name}
              />
              <span className='text-white font-bold hidden md:inline'>{session?.user.name}</span>
              <DownOutlined className='text-white text-md pr-2 hidden md:inline' />
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
      {search ?
        <div className='grid grid-cols-10 gap-x-4 items-end mt-6 mb-4'>
          <h1 className='text-white text-2xl font-bold col-span-5 m-0 '>Most listened</h1>
          <h1 className='text-white text-2xl font-bold col-span-4 m-0 hover:underline cursor-pointer'>Songs</h1>
          <Link href='/tracks' passHref>
            <h6 className='text-gray-500 text-xs font-bold col-span-1 m-0 hover:underline cursor-pointer'>SEE ALL</h6>
          </Link>
        </div> :
        null
      }
      {searchResults.slice(0, 4).map((track, index) => {

        return (
          <div key={index} className='grid grid-cols-10 gap-x-4'>
            <div className='col-span-5'>

            </div>
            <div className='col-span-5 grid grid-cols-5 hover:bg-gray-600 rounded-md cursor-pointer '>
              <div className='col-span-4 grid grid-cols-7 gap-y-3 px-4 py-2 '>
                <div className='text-white col-span-1'>
                  <img className='w-10 h-10' src={track?.url} />
                </div>
                <div className='flex flex-col col-span-6 '>
                  <span className='truncate '>{track?.artist}</span>
                  <span className='truncate text-gray-600 hover:text-white hover:underline'>{track?.title}</span>
                </div>
              </div>
              <div className=' place-self-center	'>
                <span>{millisToMinutesAndSecondsWithoutExplanation(track?.duration)}</span>
              </div>
            </div>
          </div>
        )
      })}

    </div>
  )
}

export default Search