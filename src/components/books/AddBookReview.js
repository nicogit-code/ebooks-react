import React, { useState, useEffect, useContext } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../auth/UserContext';

import styles from './AddBookReview.module.css';

export default function AddReview() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    
    const [redirect, setRedirect] = useState(false);
    const [review, setReview] = useState({
        body: '',
        date: ''
    });
    const { user } = useContext(UserContext);
    const[isSuccessfull, setSuccessfull] = useState(false);


    async function getBookById(id) {
        try {
            const res = await axios('/books/' + id);
            console.log(res);
            setBook(res.data);
        } catch(e) {
            console.warn(e);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {

            const res = await axios.post('/reviews/', {...review, user: user.username, popularityId: Number(bookId)});

            setSuccessfull(true);
            setTimeout(() => setRedirect(true), 2000);

            console.log(res);
            // setBook(res.data);
        } catch(e) {
            console.warn(e);
        }
    }

    function handleInputChange(e) {
        setReview({ ...review, [e.currentTarget.id]: e.currentTarget.value});
    }
    
    useEffect(() => { 
        getBookById(bookId); 
    }, [bookId]);

    if(!book) {
        return <h2>Loading...</h2>;
    }

    if(!user) {
    return <p>Pentru a adauga un review, trebuie sa fii autentificat</p>;
    }
    
    return (
        <div className={styles.formBody}>
            <h1>Ai citit-o? Scrie un review!</h1>
            {(isSuccessfull ?
            <>
                <div className="alert alert-success" role="alert">
                    Review-ul tau a fost salvat. Multumim!
                </div>
                {redirect && <Redirect to='/'/> }
                
            </>
                // <button type="submit" className={ styles.button }>Inapoi</button>
            : null)}



            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    {/* <label htmlFor="reviews">Review</label> */}
                    <input 
                        onChange={ handleInputChange }
                        value={ review.body }
                        type="text" 
                        className={styles.formControl} 
                        id="body" 
                        placeholder="Scrie părerea ta"
                    />
                    <br/>
                    <input 
                        onChange={ handleInputChange }
                        value={ review.date }
                        className={'dateSelector'} 
                        id="date" 
                        placeholder="Selectează data"
                        type="date"
                    />
                </div>

                <button type="submit" className={ styles.button }>Salvează</button>
            </form>
            
        </div>
    )
}
