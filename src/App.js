import './App.css';
import { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import SpotifyGrid from './components/SpotifyGrid';
import Login from './components/Login';

const getSpotifyAuthParams = (hash) => {
  const stringAfterHash = hash.substring(1);
  const params = stringAfterHash.split("&");
  let paramsStruct = params.reduce((accumulator, currentValue) => {
      console.log(currentValue);  
      const [key, value] = currentValue.split("=");
      accumulator[key] = value;
      return accumulator;
  }, {});
  return paramsStruct;
};

function App() {

  useEffect(() => {
    if(window.location.hash) {
      const {access_token, expires_in, token_type} = getSpotifyAuthParams(window.location.hash);

      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }

    
  });
  
  

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/grid" element={<SpotifyGrid/>} />
      </Routes>
      
        
      
    </div>
  );

};

export default App;
