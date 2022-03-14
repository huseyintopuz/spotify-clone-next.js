import { atom } from "recoil";

export const playlistState = atom ({
    key: 'playlistState',
    default: null
})

export const playlistIdState = atom ({
    key: 'playlistIdState',
    default: '6cPv485Ej88PFYhb5h0d48'
})

export const currentTrackIdState = atom ({
    key: 'currentTrackIdState',
    default: null
})

export const isPlayingState = atom ({
    key: 'isPlayingState',
    default: false
})
export const logoutState = atom ({
    key: 'logoutState',
    default: false
})
export const searchResultsState = atom ({
    key: 'searchResultsState',
    default: []
})