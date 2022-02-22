import { Album } from '../model/Album';
import { Track } from '../model/Track';

export class ParserService{

    parseAlbumResponse(response){
        let returnObj = { albums:[], total: response.total};
    
        let currAlbum={};
        let albums = response.items;
    
        if(!albums){
          returnObj.albums.push(new Album
              (-1, 
               "no albums found",
               "n/a", 
               "n/a", 
               [], 
               "/grayBox.jpg", 
               "n/a" 
              ));
        }
        else{
          for(let i = 0; i < albums.length; i++) {
            currAlbum = albums[i].album;
            returnObj.albums.push(new Album
              (
                i, //sequence
                currAlbum.Id,
                currAlbum.name, //album name
                currAlbum.artists[0].name, //artist
                currAlbum.release_date.slice(0,4), //release year
                [], //songs tba
                currAlbum.images[1].url, //img url 
                currAlbum.uri //uri for album
              )
            );
          }
        }
        
        return returnObj;
      }
    
    parseCurrentlyPlayingResponse(response) {
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
        songInfo.album.id,
        songInfo.album.images[1].url //album art url 
        );
    }
    return returnTrack;
    }
    
    parseRecentlyPlayedResponse(response) {
        
        let songs = response.items;
        let albumIds = [];
        let returnAlbums = [];
       
        for(let i = 0; i < songs.length; i++){
          if (returnAlbums.length === 4){ break;}
          if(!albumIds.includes(songs[i].track.album.id) && songs[i].track.album.id ){
            albumIds.push(songs[i].track.album.id);
            returnAlbums.push(new Album
              (
                returnAlbums.length,
                songs[i].track.album.id, //id
                songs[i].track.album.name, //album
                songs[i].track.album.artists[0].name, //artist 
                songs[i].track.album.release_date.slice(0, 4), //release year 
                [],
                songs[i].track.album.images[1].url, //album art url 
                songs[i].track.album.images[1].url.uri,
              ));
          }
        }
        while(returnAlbums.length < 4) {
          returnAlbums.push(new Track
          (
            -1,
            "",
            "Recent track",
            "not found",
            "",
            "/grayBox.jpg"
          ));
        }
        
        return returnAlbums;
      }
}