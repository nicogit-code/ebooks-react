import React from 'react';
import { Link } from 'react-router-dom';

import styles from './BookCard.module.css';


function BookCard({ book, onDelete }) {
    // console.log(book.title);
      return (
        // <div className="col-md-3">
            <div className={styles.card}>
                <ul className={styles.cardBody}>
                    <li><img className={styles.cardImg} src={ book.cover } component="img" alt="Book Cover" /></li>
                    <li><h5 className={styles.bookTitle}> { book.title } </h5></li>
                    <li><h6 className={styles.bookAuthor}> { book.author } </h6></li>
                    <li><p className={styles.bookRating}>Rating: { book.rating } </p></li>
                    <li><Link to={ '/books/' + book.id } className={ styles.button }>Detalii</Link></li>
                    { onDelete && <li><button className={ styles.button } onClick={() => onDelete(book.libId)}>Delete</button></li> }
                </ul>
            </div>
        // </div>
      );
}

export default BookCard;