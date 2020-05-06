import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../auth/UserContext';
import styles from './BookDetails.module.css';

import BookReviews from './BookReviews';

function BookDetails() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const [redirect, setRedirect] = useState(false);
    const [isSuccessfull, setSuccessfull] = useState(null);

    const { user } = useContext(UserContext);

    async function getBookById(id) {
        try {
            const res = await axios('/books/' + id);
            // console.log(res.data);
            setBook(res.data);
        } catch(e) {
            console.warn(e);
        }
        // console.log(book);
    }

    async function handleAddToFavorites() {
        const res = await axios.post('/userLibrary', { userId: user.id, bookId: book.id});
        setSuccessfull(true);
        setTimeout(() => setRedirect(true), 2000);
    }
    
    useEffect(() => { 
        getBookById(bookId); 
    }, [bookId]);

    if(book) {
        return (
            <div className="wrapper">
            {(isSuccessfull ?
                <>
                    <div className="alert alert-success" role="alert">
                        Modificările tale a fost salvate. Mulțumim!
                    </div>
                    {redirect && <Redirect to='/profile'/> }
                </>
                : null)}
                <div className={ styles.container }>
                    <div className="row">
                        <div className="col-8">
                            <h1>{ book.title }</h1>
                            <h4>Autor: { book.author }</h4>
                            <p>Categorie: { book.genre }</p>
                            <p>ISBN: { book.isbn }</p>
                            <p>Anul publicării: { book.publicationDate } </p>
                            <p>Titlul original: { book.originalTitle }</p>
                            <p>Limba originală: { book.originalLanguage }</p>
                            <p>Descriere: { book.description } <a href={ book.readMore }>Citeste mai mult</a></p>
                            {/* <button className={ styles.button }><a href={ book.download }>Download</a></button> */}
                            {/* <button className={ styles.button }><a href={ book.download }>Adauga la favorite</a></button> */}
                            {/* <button className={ styles.button }><a href={ book.download }>Editeaza...</a></button> */}
                            {(user ?
                                <Link className={ styles.button } to={ book.download }>Download</Link>
                            : null)}
                            
                            {(user ?
                                <Link className={ styles.button } onClick={ handleAddToFavorites }>Adaugă la favorite</Link>
                            : null)}
                            
                            {(user ?
                                <Link className={ styles.button } to={"/books/add/" + book.id }>Adaugă review</Link>
                            : null)}

        
                            
                        </div>
                        <div>
                            <img className={ styles.cardImg } src={ book.cover } component="img" alt="Book Cover"/>
                        </div>
                        <div className={ styles.reviews }>
                            <BookReviews key={ book.id }/>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return <h2>Loading...</h2>
    }
    
}

export default BookDetails;