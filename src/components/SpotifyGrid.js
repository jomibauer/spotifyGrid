import Grid from './grid-components/Grid';
import Header from './header-components/Header';
import { Album } from '../model/Album';
import { Track } from '../model/Track';
import { useState,useEffect, useCallback } from 'react';
import axios from 'axios';

const albums_endpoint = "https://api.spotify.com/v1/me/albums";
const currently_playing_endpoint = "https://api.spotify.com/v1/me/player/currently-playing";
const start_playback_endpoint = "https://api.spotify.com/v1/me/player/play";
const recently_played_endpoint = "https://api.spotify.com/v1/me/player/recently-played";
const pause_playback_endpoint =  	'https://api.spotify.com/v1/me/player/pause';

function getAlbumsFromResponse(response){
    let returnObj = { albums:[], total:0};
    let currAlbum={};
    returnObj.total = response.total;
    let albums = response.items;
    if(!albums){
      returnObj.albums.push(new Album(-1, "no albums found", "n/a", "n/a", [], "/grayBox.jpg", "n/a" ));
    }
    else{
      for(let i = 0; i < albums.length; i++) {
        currAlbum = albums[i].album;
        returnObj.albums.push(new Album
          (
            i, //id
            currAlbum.name, //album name
            currAlbum.artists[0].name, //artist
            currAlbum.release_date.slice(0,4), //release year
            [], //songs tba
            currAlbum.images[1].url, //img url 
            currAlbum.uri //uri for album
            ));
      }
    }
  
    return returnObj;
  }
function getCurrentlyPlayingFromResponse(response) {
  let songInfo = response.item;
  let returnTrack = new Track();
  if(!songInfo){
    returnTrack = new Track
    (
      -1,
      "no song currently playing",
      "N/A",
      "N/A",
      "N/A",
      "/grayBox.jpg"
    );
  }
  else{
    returnTrack = new Track
    (
      songInfo.id, //id
      songInfo.name, //trackname
      songInfo.album.artists[0].name, //artist 
      songInfo.album.release_date.slice(0, 4), //release year 
      songInfo.album.name, //album
      songInfo.album.images[1].url //album art url 
    );
  }
  return returnTrack;
}

function getRecentlyPlayedFromResponse(response) {
  let songs = response.items;
  let albums = [];
  let returnTracks = [];
 
  for(let i = songs.length - 1; i> 0; i--){
    if (returnTracks.length === 4){ break;}
    if(!albums.includes(songs[i].track.album.id)){
      albums.push(songs[i].track.album.id);
      returnTracks.push(new Album
        (
          songs[i].track.id, //id
          songs[i].track.album.name, //album
          songs[i].track.album.artists[0].name, //artist 
          songs[i].track.album.release_date.slice(0, 4), //release year 
          [],
          songs[i].track.album.images[1].url, //album art url 
          songs[i].track.album.images[1].url.uri,
        ));
    }
  }
  while(returnTracks.length < 4) {
    returnTracks.push(new Track
    (
      -1,
      "",
      "Recent track",
      "not found",
      "",
      "/grayBox.jpg"
    ));
  }
  
  return returnTracks;
}

const SpotifyGrid = () => {
    const [albumList, setAlbumList] = useState();
    const [albumsInLib, setAlbumsInLib] = useState(0);
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
    const [recentlyPlayed, setRecentlyPlayed] = useState();

    const getCurrentlyPlaying = useCallback( async () => {
      await axios
        .get(currently_playing_endpoint, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
          },
          transformResponse: axios.defaults.transformResponse.concat((data) => {
            return getCurrentlyPlayingFromResponse(data);
          })
        }).then((response) =>{
          setCurrentlyPlaying(response.data);
          setIsCurrentlyPlaying(response.data.id === -1 ? false : true);
          
          return response.data;
        })
    }, []);

    const getAlbums = useCallback(() => {
      axios
        .get(albums_endpoint + `?limit=32&offset=0`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
          },
          transformResponse: axios.defaults.transformResponse.concat((data) => {
            return getAlbumsFromResponse(data)
          })
        })
        .then((response) => {
          setAlbumList(response.data.albums);
          setAlbumsInLib(response.data.total);
          return response.data;
        });
    }, []);

    const getRecentlyPlayed = useCallback(() => {
      let recentlyPlayedSongs=[];
      axios.get(recently_played_endpoint + '?limit=50',{
        headers: {
          Authorization: "Bearer " + localStorage.getItem('accessToken'),
        },
        transformResponse: axios.defaults.transformResponse.concat((data) => {
          return getRecentlyPlayedFromResponse(data);
        })
      }).then((response) =>{
        recentlyPlayedSongs = response.data;
        setRecentlyPlayed([...recentlyPlayedSongs]);
        return recentlyPlayedSongs;
      })
    },[])
    
    const changeOneAlbum = async (albumIndex) =>{
      let newAlbumList = albumList;
      let tempOffset = Math.floor(Math.random() * (albumsInLib - 0 + 1) + 0);
      await axios
        .get(albums_endpoint + `?limit=1&offset=${tempOffset}`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
          },
          transformResponse: axios.defaults.transformResponse.concat((data) => {
            return getAlbumsFromResponse(data)
          })
          })
        .then((response) => {
          if(newAlbumList){
            newAlbumList[albumIndex] = response.data.albums[0];
            setAlbumList([...newAlbumList]);
            return response.data.albums[0];
          }
        });
    }

    const updateHeader = () =>{
      getCurrentlyPlaying();
      getRecentlyPlayed();
    }

    const playAlbum = async (uri) => {

      await axios.put(start_playback_endpoint, 
        {  
          "context_uri": uri
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('accessToken'),
          },
        }).then((response) => {
          setTimeout( function() {getCurrentlyPlaying();
          }, 1000);
          console.log(response)
        });

    }

    const togglePlayback = async () => {
      await axios.put((isCurrentlyPlaying ? pause_playback_endpoint: start_playback_endpoint), {}, {
        headers:{
          Authorization: "Bearer " + localStorage.getItem('accessToken'),
        }
      });
      setIsCurrentlyPlaying(!isCurrentlyPlaying);
    }

    useEffect(() => {
      if(!albumList){
        getAlbums();
      }
    }, [getAlbums, albumList]);

    useEffect(() => {
      if(!currentlyPlaying) {
        getCurrentlyPlaying();
      }
    }, [currentlyPlaying, getCurrentlyPlaying]);
    
    useEffect(() => {
      if(!recentlyPlayed) {
        getRecentlyPlayed();
      }
    }, [recentlyPlayed, getRecentlyPlayed])
    
    if(!albumList){
      return (<p>Loading...</p>);
    } 
    else {
      return (
        <div className='container'>
            <div className='row'>
                <Header currentlyPlaying={currentlyPlaying} updateHeader={updateHeader} recentlyHeard={recentlyPlayed} togglePlayback={togglePlayback} isCurrentlyPlaying={isCurrentlyPlaying}/>
            </div> 
            <div className="row">
                <Grid albums={albumList} onSquareClick={changeOneAlbum} onPlayClick={playAlbum}/>
            </div>
        </div>
        );
    }
};

export default SpotifyGrid;
