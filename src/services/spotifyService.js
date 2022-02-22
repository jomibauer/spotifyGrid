import axios from 'axios';
import { ParserService } from './parserService';


export class SpotifyService{

  apiPath = "https://api.spotify.com/v1/me/";
  parserService = new ParserService();

  getAlbums() {
    return axios
        .get(this.apiPath + `albums?limit=32&offset=0`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('accessToken'),
            },
            transformResponse: axios.defaults.transformResponse.concat((data) => {
                return this.parserService.parseAlbumResponse(data);
            })
        })
        .catch(function (error){
          return {error: {status: error.response.status, message: error.response.message}};
        })
        .then((response) => {
          if(response.error) {
            window.location = './login';
            return response;
          }
          return response.data;
        });
      
  }

  getAlbum(offset = 0) {
    return axios
      .get(this.apiPath + `albums?limit=1&offset=${offset}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('accessToken'),
        },
        transformResponse: axios.defaults.transformResponse.concat((data) => {
          return this.parserService.parseAlbumResponse(data);
        })
      })
      .catch(function (error){
        return {error: {status: error.response.status, message: error.response.message}};
      })
      .then((response) => {
        if(response.error) {
          window.location = './login';
          return response;
        }
      
        return response.data.albums[0];
      }
    );
  }

  getCurrentlyPlaying() {
    return axios
        .get(this.apiPath + "player/currently-playing", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
          },
          transformResponse: axios.defaults.transformResponse.concat((data) => {
            return this.parserService.parseCurrentlyPlayingResponse(data);
          })
        })
        .catch(function (error){
          return {error: {status: error.response.status, message: error.response.message}};
        })
        .then((response) => {
          if(response.error) {
            window.location = './login';
            return response;
          }
          return response.data;
        });
  }

  getRecentlyPlayed() {
    
    return axios.get(this.apiPath + 'player/recently-played?limit=50',{
      headers: {
        Authorization: "Bearer " + localStorage.getItem('accessToken'),
      },
      transformResponse: axios.defaults.transformResponse.concat((data) => {
        return this.parserService.parseRecentlyPlayedResponse(data);
      })
    })
    .catch(function (error){
      return {error: {status: error.response.status, message: error.response.message}};
    })
    .then((response) => {
      if(response.error) {
        window.location = './login';
        return response;
      }
      return response.data;
    });
  }

  playAlbum(uri) {
    return axios.put(this.apiPath + 'player/play', 
      {  
        "context_uri": uri
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('accessToken'),
        },
      })
      .catch(function (error){
        return {error: {status: error.response.status, message: error.response.message}};
      })
      .then((response) => {
        if(response.error) {
          window.location = './login';
          return response;
        }
        return response.data;
      });
  }

  async togglePlayback(currentlyPlaying) {
    await axios.put(this.apiPath + (currentlyPlaying ? 'player/pause': 'player/play'), 
      {}, 
      {
        headers:{
          Authorization: "Bearer " + localStorage.getItem('accessToken'),
        }
    });
  }
}