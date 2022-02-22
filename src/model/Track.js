export class Track{
    constructor(id, name, artist, year, album, album_id, artPath){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.year = year;
        this.album = album;
        this.album_id = album_id
        this.artPath = artPath;
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
}