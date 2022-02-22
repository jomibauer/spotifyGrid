const SongInfo = ({track}) => {
    const albumAndYear = `${track.getAlbum()} (${track.getYear()})`
    return (
      <div className='container mt-1' style={{textAlign: "left"}}>
        <div className='row'>
          <label className='song-info-text'>Song:</label><label>{track.getName()}</label>
        </div>
        <div className='row'>
          <label className='song-info-text'>Album:</label> <label className='text-left'>{albumAndYear}</label>
        </div>
        <div className='row'>
        <label className='song-info-text'>Artist:</label><label>{track.getArtist()}</label>
        </div>
      </div>
    );
};

export default SongInfo;
