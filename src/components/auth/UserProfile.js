import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';


import UserContext from './UserContext';
import UserLibrary from './UserLibrary';

import styles from './UserProfile.css';

function UserProfile() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const { user } = useContext(UserContext);

    async function getBookById(id) {
        try {
            const res = await axios('/books/' + id);
            console.log(res.data);
            setBook(res.data);
        } catch(e) {
            console.warn(e);
        }
        // console.log(book);
    }

    useEffect(() => { 
        getBookById(bookId); 
    }, [bookId]);

    if(user) {
        return(
            <div className="row">
                <div className={ styles.wrapper }>
                    <h4>Nume utilizator: { user.username }</h4>
                    <p>Biblioteca ta:</p>
                    <div className={ styles.list }>
                        <UserLibrary />
                        {/* <BookCard book={userLibrary}/> */}
                    </div>
                </div>
            </div>
        );
    } else {
            return <h2>Loading...</h2>
    }
}

export default UserProfile;

