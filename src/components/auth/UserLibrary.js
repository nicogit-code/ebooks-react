import React, { useState, useEffect} from 'react';
import BookCard from '../books/BookCard';
import axios from 'axios';

function UserLibrary() {

    let [userLibrary, setUserLibrary] = useState([]);

    useEffect(() => {
        getUserLib();
    }, []);

    console.log(userLibrary);

    async function getUserLib() {

        try {
            const library = await axios.get('/userLibrary', {params: { userId: 1 }}).then(res => res.data);
            
            const promise = library.map((book) => {
                return axios.get('/books' + book.id)
                .then(res => res.data);
            });

            const userBooks = await Promise.all(promise);

            setUserLibrary(userBooks);
        }
        catch(e) {
            console.warn(e);
        }
    }

    if(userLibrary) {

        return (
            <>
                {/* {userLibrary.map((book, id) => < BookCard book={ book } key={book.id} />)} */}
                <BookCard book={userLibrary}/>
                <BookCard book={userLibrary}/>
            </>
        )
    }

}

export default UserLibrary;
