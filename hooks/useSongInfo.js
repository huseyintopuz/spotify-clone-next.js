import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../context/context';
import useSpotify from './useSpotify'

const useSongInfo = () => {
    const spotifyApi = useSpotify();
    const { currentTrackId } = useContext(StoreContext)
    const [songInfo, setSongInfo] = useState(null)

    useEffect(() => {
        const fetchSongInfo = async () => {
            if (currentTrackId) {
                const trackInfo = await fetch(
                    `https://api.spotify.com/v1/tracks/${currentTrackId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
                        }
                    }
                ).then(res => res.json());

                setSongInfo(trackInfo);

            }
        }

        fetchSongInfo();
    }, [currentTrackId, spotifyApi]);

    return songInfo;
}

export default useSongInfo