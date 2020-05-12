import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useLocation} from 'react-router-dom';

import styles from './BookList.module.css';
import BookCard from './BookCard';
import Weather from '../weather/Weather';
import Dictionary from '../dictionary/Dictionary';

function BookList() {
    let [book, setBook] = useState([]);

    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }
    const q = useQuery().get('q') || '';

    async function getBooks() {
        const res = await axios('/books');
            setBook(res.data)
    }
    
    useEffect(() => {
        getBooks();
    }, []);

    function search(book) {
        const title = book.title.toLowerCase()
        return title.includes(q.toLowerCase())
    }

    if(book) {
        return (
            <div className={ styles.container }>
                <div className={ styles.pageItems }>
                    <div>
                        <Weather/>
                    </div>
                    <div className={ styles.list }>
                        {book
                        .filter(search)
                        .map(book => <BookCard book={ book } key={ book.id } />) }
                    </div>
                    <div>
                        <Dictionary/>
                    </div>
                </div>
            </div>
        )
    }
    // if(books) {

        // return (
        //     <div className={ styles.list } >
        //         <div className="row">

        //             {/* { books.length ? 
        //                 books.map(book => <BookCard book={ book } key={ book.id } />)
        //                 : 'Loading...' } */}

        //             {/* { books
        //                 .filter(item => searchTerm && item.title.includes(searchTerm.toLowerCase()) || true)
        //                 .map(book => <BookCard book={ book } key={ book.id } /> )} */}

        //             {
        //                 <div className="wrapper">
        //                     {books
        //                     .filter(book => book.title.toLowerCase()
        //                     .includes(q.toLowerCase()))
        //                     .map(book => <BookCard show={ book } key={ book.id } />) }
        //                 </div>
        //             }
        //         </div>

                

        //     </div>

        // )
    // } else {
    //     return <h2>Loading...</h2>
    // }
}

export default BookList;
