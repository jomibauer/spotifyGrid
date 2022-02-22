import {useState, useEffect, useCallback, useRef } from 'react';

const GridSquare = ({id, album, squareStyle, onClick, onPlayClick}) => {
    const [wasClicked, setWasClicked] = useState(false);
    const [loading, setLoading] = useState(false);
    const componentMounted = useRef(true);
    // look at useRef hook to change this interval each time the square gets swapped.
    var thisInterval = ((Math.floor(Math.random() * (31 - 14 + 1)) + 14) * 1000);

    const flipSquare = useCallback(() =>{
        setWasClicked(!wasClicked);
    }, [wasClicked]);

    const changeSquare = useCallback(() => {
        onClick(id);
        flipSquare();
    }, [flipSquare, id, onClick])

    

    useEffect(() => {
       
        const sqInterval = setInterval(() => {
            changeSquare();
            console.log("hello from " + id + " interval: " + sqInterval);
        }, thisInterval);
        
        return () => {
            clearInterval(sqInterval);
            
        }
      }, [thisInterval, changeSquare, id]);
      if(!loading){
        return (
            <div className={`grid-square-container square-container`}>
                <img src={album.getArtPath()} 
                    alt={`${album.getName()} by ${album.getArtist()}`}
                    onClick={() => {onClick(id); flipSquare()}}
                    className={`img-fluid grid-square ${squareStyle} ${wasClicked? "flip": ""}`} />
                    <div className="square-overlay">
                        <label className="grid-square-label">{album.getName()} - {album.getArtist()}</label>
                        <p style={{marginBottom:0}}>{album.getYear()}
                            <button className='overlay-play-button' onClick={() => onPlayClick(album.getUri())}>Play</button>
                        </p>
                    </div>
            </div>
        );
      }
      //this might be useful if I figure out how to fix the issue with gridSquares getting unmounted.
      /* else {
          return (
                <div className="grid-square-container">
                    <div className='grid-square-loading'>
                        <div className='grid-square-overlay'>
                            <label className='grid-square-label'>Loading next album...</label>
                        </div>
                    </div>
                </div>
            );
      } */
};

GridSquare.defaultProps ={
    squareStyle: "medium-grid-square"
}


export default GridSquare;
