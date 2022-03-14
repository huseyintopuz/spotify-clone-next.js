import React, { useState } from 'react'

export const StoreContext = React.createContext(null)

export default ({ children }) => {

    const [playlist, setPlaylist] = useState()
    const [playlistId, setPlaylistId] = useState('6cPv485Ej88PFYhb5h0d48')
    const [currentTrackId, setCurrentTrackId] = useState()
    const [isPlaying, setIsPlaying] = useState(false)
    const [logout, setLogout] = useState(false)
    const [searchResults, setSearchResults] = useState([])

    const store = {
        playlist: playlist,
        setPlaylist: setPlaylist,
        playlistId: playlistId,
        setPlaylistId: setPlaylistId,
        currentTrackId: currentTrackId,
        setCurrentTrackId: setCurrentTrackId,
        isPlaying: isPlaying,
        setIsPlaying: setIsPlaying,
        logout: logout,
        setLogout: setLogout,
        searchResults: searchResults,
        setSearchResults: setSearchResults
    }

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
}