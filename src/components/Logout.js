const Logout = () => {
    const goToLogin = () =>{
        window.location = './login';
    }
    return (
        <div className='d-flex justify-content-end align-items-end h-100 pb-2'>
            <div>
                <input type="submit" value="Logout" className='btn btn-info shadow' onClick={goToLogin}></input>
            </div>
        </div>
    );
};

export default Logout;