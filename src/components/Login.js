const Login = () => {
    const querystring = require("query-string");
    const client_id = "17cf2003ce6d461697c7122d90a719ef";
    const baseUrl = "https://accounts.spotify.com/authorize?";
    const redirect_uri = "http://localhost:3000/grid";
    const scopes = "user-read-currently-playing user-library-read user-read-recently-played user-modify-playback-state";

    const loginUrl = baseUrl + querystring.stringify(
        {
            response_type: 'token',
            client_id: client_id,
            scope: scopes,
            redirect_uri: redirect_uri,
            state: generateRandomString(16)
        }
    );

    const handleLogin = () => {
        console.log(loginUrl);
        window.location = loginUrl;
    };

    return (
        <div className='container login-box rounded'>
            <div className='row'>
            </div>
            <div className='row w-100'>
                <div className='col-md-12 '>
                    <h2 className='display-4'>Login to Spotify</h2>
                </div>
            </div>
            <div className='row'>
                <div className='col-md-2 offset-10'>
                    <button className='btn btn-success' onClick={handleLogin}>Login</button>
                </div>
            </div>
        </div>
    );
};

function generateRandomString(length) {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

export default Login;
