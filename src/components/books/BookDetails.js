import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './BookDetails.module.css';
import BookReviews from './BookReviews';

import UserContext from '../auth/UserContext';

function BookDetails() {
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

    if(book) {
        return (
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
                            <Link className={ styles.button } to={"/" + book.id }>Adaugă la favorite</Link>
                        : null)}
                        
                        {(user ?
                            <Link className={ styles.button } to={"/books/edit/" + book.id }>Adaugă review</Link>
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
        );
    } else {
        return <h2>Loading...</h2>
    }
}

export default BookDetails;