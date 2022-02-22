export class Track{
    constructor(id, name, artist, year, album, artPath){
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.year = year;
        this.album = album;
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

    getArtPath(){
        return this.artPath;
    }
}