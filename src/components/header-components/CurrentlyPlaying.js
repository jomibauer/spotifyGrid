import HeaderSquare from './HeaderSquare';
import SongInfo from './SongInfo';


const CurrentlyPlaying = ({currentlyPlaying, togglePlayback, isCurrentlyPlaying}) => {
    

    return (
    <div className='container m-1'>
        <div className='row' style={{textAlign: "left"}}>
            <label>Currently Playing:</label>
        </div>
        <div className='row'>
            <div className='col-md-5'>
                <HeaderSquare imgSrc={currentlyPlaying.getArtPath()} track={currentlyPlaying} isCurrentlyPlaying={isCurrentlyPlaying} togglePlayback={togglePlayback}/>
            </div>
            <div className='col-md-7'>
                <SongInfo track={currentlyPlaying}/>
            </div>

        </div>
                
    </div>
    );
};

export default CurrentlyPlaying;
