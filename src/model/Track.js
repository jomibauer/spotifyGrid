export class Track{
    constructor(id, name, artist, year, album, album_id, artPath, songLength){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.year = year;
        this.album = album;
        this.album_id = album_id
        this.artPath = artPath;
        this.songLength = songLength;
    }

    getName(){
        return this.name;
    }

    getArtist(){
        return this.artist;
    }

    getYear(){
        return this.year;
    }

    getAlbum(){
        return this.album;
    }

    getAlbumId(){
        return this.album_id;
    }

    getArtPath(){
        return this.artPath;
    }

    getSongLength() {
        return this.songLength;
    }
}