import React, { useCallback, useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import shuffleIcon from '../images/shuffle.png'
import useSpotify from '../hooks/useSpotify'
import useSongInfo from '../hooks/useSongInfo'
import { useSession } from 'next-auth/react'
import {
  AppstoreAddOutlined,
  AuditOutlined,
  HeartOutlined,
  MinusCircleFilled,
  PauseCircleFilled,
  PlayCircleFilled,
  PlusSquareFilled,
  RetweetOutlined,
  StepBackwardOutlined,
  StepForwardOutlined
} from '@ant-design/icons'
import { Slider } from 'antd'
import 'antd/dist/antd.css';
import {debounce} from 'lodash'
import { StoreContext } from '../store/store'

const Player = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const { isPlaying, setIsPlaying} = useContext(StoreContext)
  const { currentTrackId, setCurrentTrackId } = useContext(StoreContext)
  const [volume, setVolume] = useState(50);

  const songInfo = useSongInfo();

  const fetchCurrentSong = () => {
    if (!songInfo) {
      spotifyApi.getMyCurrentPlayingTrack().then(data => {
        setCurrentTrackId(data.body?.item?.id)

        spotifyApi.getMyCurrentPlaybackState().then(data => {
          setIsPlaying(data.body?.is_playing);
        })
      })
    }
  }

  const handlePlayPause = () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if (data.body?.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false)
      }
      else {
        spotifyApi.play();
        setIsPlaying(true)
      }
    })
  }
  
  useEffect(() => {
    if (spotifyApi.getAccessToken() && !currentTrackId) {
      {
        fetchCurrentSong();
        setVolume(50);
      }
    }
  }, [currentTrackId, spotifyApi, session])

  useEffect(() => {
    if (volume > 0 && volume < 100) {
      debouncedAdjustVolume(volume)
    }
  }, [volume])

  const debouncedAdjustVolume = useCallback(
    debounce((volume) => {
      spotifyApi.setVolume(volume).catch((error) => {})
    }, 500),
    []
  )  

  return (
    <div className=' flex justify-between h-20 items-center px-5 pt-5 space-x-5 md:space-x-0 text-gray-500 bg-gradient-to-b from-black to-gray-700'>
      <div className='flex items-center space-x-2'>
        <img className='w-10 h-10 cursor-pointer' src={songInfo?.album.images[0].url}
          alt={songInfo?.name} />
        <div className='flex flex-col justify-center'>
          <span className='cursor-pointer hover:underline'>{songInfo?.name}</span>
          <span className='cursor-pointer hover:underline'>{songInfo?.album.artists[0].name}</span>
        </div>
        <HeartOutlined className='hover:text-white text-xl' />
      </div>
      <div className='flex flex-col items-center'>
        <div className='flex items-center space-x-5'>
          <Image
            src={shuffleIcon}
            alt='shuffle'
            width="20px"
            height="20px"
          />
          <StepBackwardOutlined className='button'/>

          {isPlaying
            ? <PauseCircleFilled
              style={{ color: 'white', fontSize: '2rem' }}
              className='button'
              onClick={handlePlayPause}
            />
            : <PlayCircleFilled
              style={{ color: 'white', fontSize: '2rem' }}
              className='button'
              onClick={handlePlayPause}
            />
          }

          <StepForwardOutlined className='button'/>
          <RetweetOutlined className='button'/>
        </div>
        <Slider tipFormatter={null} className='w-48 md:w-96'/>
      </div>
      <div className='flex space-x-3 md:space-x-4 items-center'>
        <AppstoreAddOutlined className='button'/>
        <AuditOutlined className='button'/>
        <div className='flex items-center space-x-3'>
          <div className='flex self-center' onClick={() => volume > 0 && setVolume(volume - 10)} >
            < MinusCircleFilled className='button'/>
          </div>
          <input
            type='range'
            value={volume}
            onChange={e => setVolume(Number(e.target.value))}
            min={0}
            max={100}
          />
          <div onClick={() => volume < 100 && setVolume(volume + 10)}>
            <PlusSquareFilled className='button'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player