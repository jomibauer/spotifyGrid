import CurrentlyPlaying from "./CurrentlyPlaying";

import { useEffect, useRef } from "react";
import RecentlyHeard from './RecentlyHeard';
import Logout from '../Logout';

const Header = ({currentlyPlaying, updateHeader, recentlyHeard, togglePlayback, isCurrentlyPlaying}) => {
  const interval = useRef(null);

  useEffect(() => {
    interval.current = setInterval(() => {
      updateHeader();
    }, 15000);
    return () => clearInterval(interval.current);
  });

  
  return (
  <div className="container border border-dark rounded app-header">
    <div className="row">
      <div className="col-md-5">
        <CurrentlyPlaying currentlyPlaying={currentlyPlaying} togglePlayback={togglePlayback} isCurrentlyPlaying={isCurrentlyPlaying}/>
      </div>
      <div className="col-md-6">
        <RecentlyHeard albums={recentlyHeard}/>
      </div>
      <div className="col-md-1">
        <Logout />
      </div>
    </div>
  </div>
  );
};

export default Header;
