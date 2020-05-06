import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../auth/UserContext';
import styles from './AddBookReview.module.css'

export default function AddToLibrary() {
    const { bookId } = useParams();
    // const { userId } = useParams();
    const [book, setBook] = useState(null);
    const [library, setLibrary] = useState(null);
    const { user } = useContext(UserContext);
    const[isSuccessfull, setSuccessfull] = useState(false);


    async function getBookById(id) {
        try {
            const res = await axios('/books/' + id);
            // console.log(res);
            setBook(res.data);
        } catch(e) {
            console.warn(e);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            // const res = await axios('/reviews/' + bookId, {
            //     method: 'PUT',
            //     headers: { 'user': user },
            //     data: JSON.stringify({ 'ReviewTest': book.review }),
            // });

            // const res = await axios('/reviews/', {
            //     method: 'POST',
            //     headers: 'test',
            //     data: { 'body': book.review, 'id': '', 'user': '', 'popularityId': book.id },
            // });
            
            const res = await axios('/users?userLibrary=' + user.id, {
                method: 'POST',
                headers: ({title: user}),
                data:{ 'user': user.username , 'popularityId': book.id, 'body': book.id },
            });

            setSuccessfull(true);

            // console.log(res);
            setLibrary(res.data);
        } catch(e) {
            console.warn(e);
        }
    }

    function handleInputChange(e) {
        setBook({ ...library, library: e.currentTarget.value});
    }
    
    useEffect(() => { 
        getBookById(bookId); 
    }, [bookId]);

    if(!book) {
        return <h2>Loading...</h2>;
    }

    // if(!user) {
    // return <p>Pentru a adauga un review, trebuie sa fii autentificat</p>;
    // }

    return (
        <div className={styles.formBody}>
            {(isSuccessfull ?
                <div className="alert alert-success" role="alert">
                    Cartea a fost salvata in biblioteca ta.
                </div>
                // <button type="submit" className={ styles.button }>Inapoi</button>
            : null)}


        <h2>Adauga in lista de favorite</h2>

            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="reviews">Biblioteca ta</label>
                    <input 
                    onChange={ handleInputChange }
                    // value={ book.review } 
                    type="text" 
                    className={'form-control'} 
                    id="reviews" 
                    placeholder="Scrie părerea ta"
                    />
                </div>

                <button type="submit" className={ styles.button }>Salvează</button>
            </form>
            
        </div>
    )
}
