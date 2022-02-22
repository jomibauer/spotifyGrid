import {useEffect} from 'react';


const Callback = () => {
  const relocate = () => {
    window.location = './grid';
  }
  
  useEffect(() => {
    setTimeout( function() {relocate();
    }, 1000);
  })
  
  return (<p>Loading...</p>);;
};

export default Callback;
