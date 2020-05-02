import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../auth/UserContext';
import styles from './EditBook.module.css'

export default function EditBook() {
    const { bookId } = useParams();
    const [book, setBook] = useState(null);
    const { user } = useContext(UserContext);
    const[isSuccessfull, setSuccessfull] = useState(false);


    // setSuccessfull(false);

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
            // const res = await axios('/reviews/' + bookId, {
            //     method: 'PUT',
            //     headers: { 'user': user },
            //     data: JSON.stringify({ 'ReviewTest': book.review }),
            // });

            const res = await axios('/reviews/', {
                method: 'POST',
                headers: ({title: user}),
                data: JSON.stringify({ 'Review': book.review  }),
            });
            
            

            // const userReview = await Promise.all(res);

            setSuccessfull(true);

            console.log(res);
            // setBook(res.data);
        } catch(e) {
            console.warn(e);
        }
    }

    function handleInputChange(e) {
        setBook({ ...book, review: e.currentTarget.value});
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
            {(isSuccessfull ?
                <div className="alert alert-success" role="alert">
                    Review-ul tau a fost salvat. Multumim!
                </div>
                // <button type="submit" className={ styles.button }>Inapoi</button>
            : null)}


        <h2>Ai citit-o? Scrie un review!</h2>

            <form onSubmit={ handleSubmit } action='/reviews/' method="POST">
                <div className="form-group">
                    <label htmlFor="reviews">Review</label>
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
