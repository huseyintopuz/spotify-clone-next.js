import { atom } from "recoil";

export const playlistState = atom ({ // songs [id] playlist
    key: 'playlistState',
    default: null
})

export const playlistIdState = atom ({ // sidebar [id] playlist
    key: 'playlistIdState',
    default: '6cPv485Ej88PFYhb5h0d48'
})

export const currentTrackIdState = atom ({ // player song usesongınfo
    key: 'currentTrackIdState',
    default: null
})
 
export const isPlayingState = atom ({ // player song songs
    key: 'isPlayingState',
    default: false
})
export const logoutState = atom ({ // layout [id] playlist createplaylist likedsong mylibrary search tracks
    key: 'logoutState',
    default: false
})
export const searchResultsState = atom ({ // search tracks
    key: 'searchResultsState',
    default: []
})