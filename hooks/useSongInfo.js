import React, { useContext, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import { currentTrackIdState } from '../atoms/atom';
import { StoreContext } from '../store/store';
import useSpotify from './useSpotify'

const useSongInfo = () => {
    const spotifyApi = useSpotify();
    const { currentTrackId } = useContext(StoreContext)
    const [songInfo, setSongInfo] = useState(null)
    // const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);


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