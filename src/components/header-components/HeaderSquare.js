import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faPlay, faPause} from '@fortawesome/free-solid-svg-icons';
 
const HeaderSquare = ({imgSrc, track, squareStyle, togglePlayback, isCurrentlyPlaying}) => {
    const toggle = () => {        
        togglePlayback();
    }

    const getIcon = () =>{
        return isCurrentlyPlaying ? faPause: faPlay;
    }

    return (
        <div className='square-container currently-playing-square'>
            <img src={imgSrc} 
                 alt={`${track.getName()} by ${track.getArtist()}`} 
                 className={`img-thumbnail img-fluid ${squareStyle}`}/>
            <div className="square-overlay">
                <p>
                    <button 
                     className='overlay-play-button' 
                     onClick={toggle}><FontAwesomeIcon className='mx-1' icon={ getIcon() } />
                    </button>
                </p>
            </div>
        </div>
    );
};

HeaderSquare.defaultProps ={
    squareStyle: "currently-playing-square"
}


export default HeaderSquare;
