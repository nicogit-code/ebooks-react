import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from '../auth/UserProfile.css';


function SavedBooks(onDelete) {
    // const { bookId } = useParams();
    let [book, setBook] = useState([]);
    const [ deleteItem, setDeleteItem ] = useState(null);

    useEffect(() => {
        getBooks();
    }, []);

    async function getBooks(id) {
        const res = await axios('/books'+ id);
            setBook(res.data)
    }

    async function DeleteItem(e) {
        const res = await axios.delete('/users?userLibrary' + e.currentTarget.getAttribute('data-item-id'));
        onDelete(e.currentTarget.getAttribute('data-item-id'));
        setDeleteItem(res.data);
    }
 
    if(book) {
        return (
            <>
            <div className="container">
                <h1>{ book.title }</h1>
                <p>{ book.cover }</p>
            </div>
            <button 
                // data-item-id={ book.id }
                className={ styles.button } 
                onClick={ DeleteItem } >Șterge din listă
            </button>
            </>
        )
    }
}

export default SavedBooks;