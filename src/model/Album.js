export class Album{
    constructor(seq, id, name, artist, year, songs, artPath, uri){
        this.seq = seq;
        this.id = id;
        this.name = name;
        this.artist = artist;
        this.year = year;
        this.songs = songs;
        this.artPath = artPath;
        this.uri = uri;
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

    getSongs(){
        return this.songs;
    }

    getArtPath(){
        return this.artPath;
    }

    getId(){
        return this.id;
    }

    getUri(){
        return this.uri;
    }
}