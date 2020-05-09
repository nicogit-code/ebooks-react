import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from './BookDetails.module.css';
import UserContext from '../auth/UserContext';


function BookReviews() {
    
    const { bookId } = useParams();
    // const [book, setBook] = useState(null);
    const setBook = useState(null);
    const [reviews, setReviews] = useState([]);
    const { user } = useContext(UserContext);

    async function getReviews(id) {
        try {
            const promises = [];
            promises.push(axios('/popularity/' + id).then(res => res.data));
            promises.push(axios('/reviews?popularityId=' + id).then(res => res.data));

            const [book, reviews] = await Promise.all(promises);

            setReviews(reviews);
            setBook(book);
            // console.log(book, reviews);

        } catch(e) {
            console.warn(e);
        }
    }

        useEffect(() => { 
            getReviews(bookId); 
        }, [bookId]);

        if(reviews) {
            return (
                <div className="reviews">
                    <h3>Reviews</h3>
                    {/* { reviews.map(review => <p>{ review.user }<p>{ review.body }</p></p>) } */}
                    { reviews.map (review => (
                        <>
                            <h5>{ review.user }</h5>
                            <h6>{ review.date }</h6>
                            <p>{ review.body }</p>
                            {(user && user.username === review.user ?
                                <Link className={ styles.button } to={"/books/edit/" + review.id } key={review.id}>Editeaza review</Link>
                                // <button onClick={this.deleteReviewHandler} className={ styles.button }>Sterge review</button>
                            : null)}
                        </> 
                    
                   
                    ))}
                    
                    {/* {
                        (user?
                            
                            <Link to={"/books/edit/" + book.id } className={ styles.button}>Edit this review</Link>
                        : null
                            
                            )} */}
                </div>
            )
        }
    }

export default BookReviews;

// import React, { useEffect, useState, useContext } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// // import styles from './BookDetails.module.css';
// import UserContext from '../auth/UserContext';


// function Popularity() {
    
//     const { bookId } = useParams();
//     const [book, setBook] = useState(null);
//     const [reviews, setReviews] = useState([]);
//     const { user } = useContext(UserContext);

//     async function getReviews(id) {
//         try {
//             const promises = [];
//             promises.push(axios('/popularity/' + id).then(res => res.data));
//             promises.push(axios('/reviews?popularityId=' + id).then(res => res.data));

//             const [book, reviews] = await Promise.all(promises);

//             setReviews(reviews);
//             setBook(book);
//             // console.log(book, reviews);

//         } catch(e) {
//             console.warn(e);
//         }
//     }

//         useEffect(() => { 
//             getReviews(bookId); 
//         }, [bookId]);

//         if(reviews) {
//             return (
//                 <div className="reviews">
//                     <h3>Reviews</h3>
//                     {/* { reviews.map(review => <p>{ review.user }<p>{ review.body }</p></p>) } */}
//                     { reviews.map (review => 
//                     <>
//                     <h5>{ review.user }</h5>
//                     <h6>{ review.date }</h6>
//                     <p>{ review.body }</p>
//                     </> )}
                    
                    
//                     {/* {
//                         (user?
                            
//                             <Link to={'./popularity/edit' + book.id} className={ styles.button}Edit this review></Link>
//                         : null
                            
//                             )} */}
//                 </div>
//             )
//         }
//     }

// export default Popularity;
