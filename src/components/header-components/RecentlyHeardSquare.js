const RecentlyHeardSquare = ({album, squareStyle}) => {
  return (
    <div>
        <div className={`square-container queue-box ${squareStyle}`}>
            <img src={album.getArtPath()} 
                alt={`${album.getName()} by ${album.getArtist()}`}
                className={`img-thumbnail img-fluid grid-square queue-box ${squareStyle}`} />
                <div className="square-overlay">
                    <label className={`text-${squareStyle}`}>{album.getName()} - {album.getArtist()}</label>
                    <p className={`text-${squareStyle}`}style={{marginBottom:0}}>{album.getYear()}</p>
                </div>
        </div>
    </div>
  );
};

export default RecentlyHeardSquare;
