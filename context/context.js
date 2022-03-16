import React, { useState } from 'react'

export const StoreContext = React.createContext(null)

export default ({ children }) => {

    const [playlist, setPlaylist] = useState()
    const [playlistId, setPlaylistId] = useState('6cPv485Ej88PFYhb5h0d48')
    const [currentTrackId, setCurrentTrackId] = useState()
    const [isPlaying, setIsPlaying] = useState(false)
    const [logout, setLogout] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    const context = {
        playlist,
        setPlaylist,
        playlistId,
        setPlaylistId,
        currentTrackId,
        setCurrentTrackId,
        isPlaying,
        setIsPlaying,
        logout,
        setLogout,
        searchResults,
        setSearchResults
    }

  return <StoreContext.Provider value={context}>{children}</StoreContext.Provider>
}