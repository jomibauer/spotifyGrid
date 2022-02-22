import Grid from './grid-components/Grid';
import Header from './header-components/Header';
import { useState,useEffect, useCallback } from 'react';
import { SpotifyService } from '../services/spotifyService';

const spotifyService = new SpotifyService();

const SpotifyGrid = () => {
    const [albumList, setAlbumList] = useState();
    const [albumsInLib, setAlbumsInLib] = useState(0);
    const [currentlyPlaying, setCurrentlyPlaying] = useState();
    const [isCurrentlyPlaying, setIsCurrentlyPlaying] = useState(false);
    const [recentlyPlayed, setRecentlyPlayed] = useState();

    function requestFailed(response){
      if(response === 401) {return true;}
      return false;
    }

    function checkResponse(response){
      if(requestFailed(response)) {window.location = './login';} 
    }

    const getCurrentlyPlaying = useCallback( () => {
      spotifyService.getCurrentlyPlaying().then(response => {
        if(response === 401) {return true;}
        setCurrentlyPlaying(response);
        setIsCurrentlyPlaying(response.id === -1 ? false : true);
      });
    }, []);

    const getAlbums = useCallback(() => {
      spotifyService.getAlbums().then( response =>{
        console.log(response);
        if(response === 401) {return true;} 
        setAlbumList(response.albums);
        setAlbumsInLib(response.total);
      });
    }, []);

    const getRecentlyPlayed = useCallback(() => {
      spotifyService.getRecentlyPlayed().then(response =>{
        if(response === 401) {return true;}
        setRecentlyPlayed([...response]);
      })
    },[currentlyPlaying])
    
    const changeOneAlbum = (albumIndex) =>{
      let newAlbumList = albumList;
      let tempOffset = Math.floor(Math.random() * (albumsInLib - 0 + 1) + 0);

      spotifyService.getAlbum(tempOffset).then( response => {
        checkResponse(response);
        if(newAlbumList){
          newAlbumList[albumIndex] = response;
          setAlbumList([...newAlbumList]);
        }
      })
    }

    const updateHeader = () =>{
      getCurrentlyPlaying();
      getRecentlyPlayed();
    }

    const playAlbum = (uri) => {
      spotifyService.playAlbum(uri).then( response => {
        checkResponse(response);
        setTimeout( function() {
          getCurrentlyPlaying();
        }, 1000);
      })
    }

    const togglePlayback = async () => {
      await spotifyService.togglePlayback(isCurrentlyPlaying);
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
