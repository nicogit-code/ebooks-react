import React, { useContext } from 'react';
// import axios from 'axios';
import UserContext from './UserContext';
import UserLibrary from './UserLibrary';

function UserProfile() {
    const { user } = useContext(UserContext);
   
    if(user) {
        return(
            <div className="profile">
                <div>
                    <p>Nume: { user.username }</p>
                    
                    <a href="/">Adauga o carte</a>
                    <a href="/">Sterge o carte</a>
                </div>
                <div>
                    <p>Biblioteca ta:</p>
                    <UserLibrary />
                </div>
            </div>
        )} else {
            return <h2>Loading...</h2>
    }
}

export default UserProfile;

