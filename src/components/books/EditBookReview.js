import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
import styles from './AddBookReview.module.css';

export default function EditReview() {
    // const { bookId } = useParams();
    const { reviewId } = useParams();
    const [redirect, setRedirect] = useState(false);
    const [review, setReview] = useState({
        body: '',
        date: ''
    });
    const[isSuccessfull, setSuccessfull] = useState(false);

    useEffect(() => { 
        getReview(reviewId); 
    }, [reviewId]);

    async function getReview() {
        try {
            const res = await axios('/reviews/' + reviewId);
            console.log(res);
            setReview(res.data);
        } catch(e) {
            console.warn(e);
        }
    }

    function handleInputChange(e) {
        setReview({ ...review, [e.currentTarget.id]: e.currentTarget.value});
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {

            const res = await axios.put('/reviews/' + reviewId, review);

        setSuccessfull(true);
        setTimeout(() => setRedirect(true), 2000);

        console.log(res);
        } catch(e) {
            console.warn(e);
        }
    }

    if(!review) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className={styles.formBody}>
            <h1>Editează review</h1>
            {(isSuccessfull ?
            <>
                <div className="alert alert-success" role="alert">
                    Modificările tale a fost salvate. Mulțumim!
                </div>
                {redirect && <Redirect to='/'/> }
                {/* <Redirect to ='/books/'/> */}
                {/* <button 
                    className={ styles.button } 
                    onClick={ handleSubmit }
                    href='/books/'>Back
                </button> */}
            </>
            : null)}

            <form onSubmit={ handleSubmit }>
                <div className="form-group">
                    <label htmlFor="reviews">Review-ul tău</label>
                    <p>{ review.body }</p>
                    <input 
                        onChange={ handleInputChange }
                        value={review.body}
                        type="text" 
                        className={'form-control'} 
                        id="body" 
                    />
                    <input 
                        onChange={ handleInputChange }
                        value={review.date}
                        className={'form-control'} 
                        id="date" 
                        placeholder=""
                        type="date"
                    />
                </div>
                <button type="submit" className={ styles.button }>Salvează modificarea</button>
            </form>
        </div>
    )
}


// INAINTE DE ADAUGARE BUTON DELETE - GOOD

// export default function EditReview() {
//     // const { bookId } = useParams();
//     const { reviewId } = useParams();
//     const [redirect, setRedirect] = useState(false);
//     const [review, setReview] = useState({
//         body: '',
//         date: ''
//     });
//     const[isSuccessfull, setSuccessfull] = useState(false);

//     useEffect(() => { 
//         getReview(reviewId); 
//     }, [reviewId]);

//     async function getReview() {
//         try {
//             const res = await axios('/reviews/' + reviewId);
//             console.log(res);
//             setReview(res.data);
//         } catch(e) {
//             console.warn(e);
//         }
//     }

//     function handleInputChange(e) {
//         setReview({ ...review, [e.currentTarget.id]: e.currentTarget.value});
//     }

//     async function handleSubmit(e) {
//         e.preventDefault();
//         try {

//             const res = await axios.put('/reviews/' + reviewId, review);

//         setSuccessfull(true);
//         setTimeout(() => setRedirect(true), 2000);

//         console.log(res);
//         } catch(e) {
//             console.warn(e);
//         }
//     }

//     if(!review) {
//         return <h2>Loading...</h2>;
//     }

//     return (
//         <div className={styles.formBody}>
//             <h1>Editează review</h1>
//             {(isSuccessfull ?
//             <>
//                 <div className="alert alert-success" role="alert">
//                     Modificările tale a fost salvate. Mulțumim!
//                 </div>
//                 {redirect && <Redirect to='/'/> }
//                 {/* <Redirect to ='/books/'/> */}
//                 {/* <button 
//                     className={ styles.button } 
//                     onClick={ handleSubmit }
//                     href='/books/'>Back
//                 </button> */}
//             </>
//             : null)}

//             <form onSubmit={ handleSubmit }>
//                 <div className="form-group">
//                     <label htmlFor="reviews">Review-ul tău</label>
//                     <p>{ review.body }</p>
//                     <input 
//                         onChange={ handleInputChange }
//                         value={review.body}
//                         type="text" 
//                         className={'form-control'} 
//                         id="body" 
//                     />
//                     <input 
//                         onChange={ handleInputChange }
//                         value={review.date}
//                         className={'form-control'} 
//                         id="date" 
//                         placeholder=""
//                         type="date"
//                     />
//                 </div>
//                 <button type="submit" className={ styles.button }>Salvează modificarea</button>
//             </form>
//         </div>
//     )
// }
