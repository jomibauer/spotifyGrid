import RecentlyHeardSquare from './RecentlyHeardSquare';

const RecentlyHeard = ({albums}) => {
  return (
    <div className='container m-1'>
      <div className='row' style={{textAlign: "left", marginBottom: "1em" }}>
        <label>Recently Heard:</label>
      </div>
      <div className='row'>
        <div className='col-md-3'>
          <RecentlyHeardSquare  album={albums[0]} squareStyle={"queue-first"}/>
        </div>
        <div className='col-md-3'>
          <RecentlyHeardSquare album={albums[1]} squareStyle={"queue-second"}/>
        </div>
        <div className='col-md-3'>
          <RecentlyHeardSquare album={albums[2]} squareStyle={"queue-third"}/>
        </div>
        <div className='col-md-3'>
          <RecentlyHeardSquare album={albums[3]} squareStyle={"queue-fourth"}/>
        </div>
      </div>
    </div>
  );
};

export default RecentlyHeard;
