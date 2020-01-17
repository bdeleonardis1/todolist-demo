import React from 'react';
import {Link} from 'react-router-dom';

function Logout(props) {
    return (
        <p>You have been logged out. <Link to="/login">Log back in?</Link></p>
    )
}

export default Logout;