import React, { useContext } from 'react'
import { millisToMinutesAndSecondsWithoutExplanation } from '../lib/time';
import useSpotify from '../hooks/useSpotify';
import { StoreContext } from '../context/context';

const Song = ({ item, order }) => {
    const spotifyApi = useSpotify()
    const { setIsPlaying } = useContext(StoreContext)
    const { setCurrentTrackId } = useContext(StoreContext)
    
    const playSong = () => {
        setCurrentTrackId(item.track.id);
        setIsPlaying(true);
        spotifyApi.play({
            uris: [item.track.uri],
        })
    }

    return (
        <ul>
            <li onClick={playSong} style={{ display: 'grid', gridTemplateColumns: '0.5fr 4.5fr 3fr 1.8fr 1fr' }}
                className='flex items-center space-x-2 md:space-x-0 px-5 py-2 hover:bg-gray-900 cursor-pointer group'
            >
                <span className='text-white'>{order + 1}</span>
                <div className='flex space-x-4'>
                    <img className='w-10 h-10' src={item?.track.album.images?.[0].url} />
                    <div className='flex flex-col text-white text-sm '>
                        <span className='truncate font-bold'>{item?.track.name}</span>
                        <span className='truncate hover:underline cursor-pointer text-gray-300 group-hover:text-white'>{item?.track.album.artists[0].name}</span>
                    </div>
                </div>
                <span className='text-gray-300 text-sm hidden sm:inline hover:underline cursor-pointer group-hover:text-white'>{item?.track.album.name}</span>
                <span className='text-gray-300 text-sm hidden md:inline'>{item?.added_at}</span>
                <span className='text-gray-300 text-sm text-center ml-20 sm:ml-0 '>{millisToMinutesAndSecondsWithoutExplanation(item?.track.duration_ms)}</span>
            </li>
        </ul>
    )
}

export default Song

