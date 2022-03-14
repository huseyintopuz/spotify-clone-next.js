import React, { useContext } from 'react'
import Song from './Song'
import useSpotify from '../hooks/useSpotify'
import { PlayCircleFilled, EllipsisOutlined, ClockCircleFilled } from '@ant-design/icons'
import 'antd/dist/antd.css';
import { StoreContext } from '../store/store'

const Songs = () => {
    const spotifyApi = useSpotify()
    const { setIsPlaying } = useContext(StoreContext)
    const { playlist } = useContext(StoreContext);

    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then(data => {
          if(data.body?.is_playing) {
            spotifyApi.pause();
            setIsPlaying(false)
          }
          else {
            spotifyApi.play();
            setIsPlaying(true)
          }
        })
      }
    
    return (
        <div className='pb-8 px-8 mb-20'>
            <div className='space-x-7 mb-5'>
                <PlayCircleFilled
                 style={{color: 'rgb(34,197,94)', fontSize: '3.5rem'}}
                  className='play' 
                  onClick={handlePlayPause}
                  />
                <EllipsisOutlined style={{color: 'white', fontSize: '1.9rem', opacity: '0.9'}} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '0.5fr 4.5fr 3fr 1.8fr 1fr ' }} className='flex items-center px-5 py-2 space-x-2 md:space-x-0 text-white text-sm border-b border-b-gray-300 border-solid mb-2'>
                <h4 className='text-white m-0'>#</h4>
                <h4 className='w-36 lg:w-64 text-white m-0'>TITLE</h4>
                <h4 className='hidden sm:inline text-white m-0'>ALBUM</h4>
                <h4 className='hidden md:inline text-white m-0'>ADDED AT</h4>
                <ClockCircleFilled className='text-white self-center m-0'/>
            </div>

            {playlist?.tracks.items.map((item, i) => {
                return (
                    <Song key={item.track.id} item={item} order={i}/>
                )
            })
            }
        </div>
    )
}

export default Songs