import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import BookCard from '../books/BookCard';
import axios from 'axios';

import styles from './UserProfile.css';

function UserLibrary(onDelete) {

    const { bookId } = useParams();
    const [books, setBooks] = useState([]);
    const [library, setLibrary] = useState([]);
    const [ deleteItem, setDeleteItem ] = useState(null);
    const { user } = useContext(UserContext);

    async function getUserLib() {

        try {
            const library = await axios.get('/userLibrary', { params: {userId: user.id} }).then(res => res.data);

            const promises = library.map(lib => axios('/books/' + lib.bookId).then(res => res.data));
            console.warn({user, library})
            const books = await Promise.all(promises);
            const booksWithLibId = books.map((book, i) => ({...book, libId: library[i].id}) );

            setLibrary(library);
            setBooks(booksWithLibId);

            // const promise = library.map((book) => {
            //     return axios.get('/books/' + book.id)
            //     .then(res => res.data);
            // });

            // const userBooks = await Promise.all(promise);

        }
        catch(e) {
            console.warn(e);
        }
    }

    useEffect(() => { 
        getUserLib(bookId);

    }, []);

    async function DeleteItem(e) {
        const res = await axios.delete('/users?userLibrary' + e.currentTarget.getAttribute('data-item-id'));
        onDelete(e.currentTarget.getAttribute('data-item-id'));
        setDeleteItem(res.data);

        console.log(res);
    }

    async function handleDelete(id) {
        
        console.log('s-a sters cartea', id);
        try{
            await axios.delete('/userLibrary/' + id, { 
                data:id,
        
        }).then(setLibrary(library.filter(book => book.id !== Number(id)))); 
        } catch(e) {
            console.warn(e)
        }
    }
console.log(books);
    if(books) {

        return (
            <>
                {books.map(book => (
                    <BookCard book={ book } onDelete={handleDelete} key={ book.id } />
                ))}
            </>
        )
    }

}

export default UserLibrary;
