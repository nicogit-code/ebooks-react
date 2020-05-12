import React, { useState, useEffect, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import UserContext from '../auth/UserContext';
import BookCard from '../books/BookCard';
import axios from 'axios';

// import styles from './UserProfile.css';

function UserLibrary(onDelete) {

    const { bookId } = useParams();
    const [books, setBooks] = useState([]);
    const [library, setLibrary] = useState([]);
    const [ deleteItem, setDeleteItem ] = useState(null);
    const { user } = useContext(UserContext);
    const [redirect, setRedirect] = useState(false);

    async function getUserLib() {

        try {
            const library = await axios.get('/userLibrary', { params: {userId: user.id} }).then(res => res.data);

            const promises = library.map(lib => axios('/books/' + lib.bookId).then(res => res.data));
            console.warn({user, library})
            const books = await Promise.all(promises);
            const booksWithLibId = books.map((book, i) => ({...book, libId: library[i].id}) );

            setLibrary(library);
            setBooks(booksWithLibId);
        } catch(e) {
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
        setTimeout(() => setDeleteItem(true), 200);
        } catch(e) {
            console.warn(e)
        }
    }

    if(books) {

        return (
            <div className="wrapper">
            {(deleteItem ?
                <>
                    <div className="alert alert-success" role="alert">
                        Modificările tale au fost salvate.
                        {redirect && <Redirect to='/profile'/> }
                    </div>
                    {/* <Redirect to='/profile'/> */}
                </>
                : null)}
            <>
                {books.map(book => (
                    <BookCard book={ book } onDelete={handleDelete} key={ book.id } />
                ))}
            </>
            </div>
        )
    }

}

export default UserLibrary;
