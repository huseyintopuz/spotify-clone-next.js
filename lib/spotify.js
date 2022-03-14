import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
    'user-read-playback-state',
    'user-read-currently-playing',
    'user-modify-playback-state',
    'user-read-private',
    'user-read-email',
    'user-follow-read',
    'user-library-read',
    'user-top-read',
    'user-read-recently-played',
    'playlist-read-private',
    'playlist-read-collaborative',
    'streaming',
].join(',');

const params = {
    scope: scopes,
}

const queryParamString = new URLSearchParams(params);

const LOGIN_URL =
    'https://accounts.spotify.com/authorize?' + queryParamString.toString();

const spotifyApi = new SpotifyWebApi({
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
})

export default spotifyApi;

export { LOGIN_URL };