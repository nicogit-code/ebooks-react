import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Filter.css';
import BookCard from '../books/BookCard';

export default function Filter() {
    const [ items, setItems ] = useState([]);
    const [ search, setSearch ] = useState('');
    // let [books, setBooks] = useState([]);

    async function makeRequest() {

        try {
            const res = await axios('/books/');
            setItems(res.data)
        } catch(err) {
            console.warn(err);
        }
    }

    useEffect(() => {
        const promise = makeRequest();
        console.log(promise);
    }, []);

    return (
        <>
        <div className={ styles.filterArea }>
            {/* <h5>Caută titlu</h5> */}
            <input onChange={ (e) => setSearch(e.currentTarget.value) } value={ search } placeholder="Search"/>
            { items 
            .filter(book => book.title.includes(search))
            .map(book => <p key={ book.id }>{ book.title }</p>)
            }
        </div>

        {/* <div>
        { items.length ? 
            items
            .filter(book => book.title.includes(search))
            .map(book => <BookCard book={ book } key={ book.id } />)
            : 'Loading...' }
        </div> */}
        </>
    )
}
