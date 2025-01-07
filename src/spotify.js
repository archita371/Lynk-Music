import axios from "axios"

const authEndpoint = 'https://accounts.spotify.com/authorize?'
const clientID = '5dd2418147ce4610a79afbdbcb042503'
const redirectUri = "https://lynk-music.onrender.com/"
const scopes = ['user-library-read','playlist-read-private','user-read-currently-playing','playlist-modify-public','playlist-modify-private','user-read-private','user-read-email']

export const loginEndpoint = `${authEndpoint}client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopes.join(
    "%20"
)}&response_type=token&show_dialog=true`

const apiClient = axios.create({
    baseURL : "https://api.spotify.com/v1/",

});

export const setClientToken = (token) => {
    apiClient.interceptors.request.use(async function (config) {
        config.headers.Authorization = "Bearer "+ token;
        return config;

    })
}

export default apiClient;
