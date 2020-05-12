import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import axios from 'axios';
import styles from './GoT.module.css';

function GoTBooks() {
    const [books, setBooks] = useState(null);
    const [characters, setCharacters] = useState(null);
  
    const fetchBooks = async () => {
      const response = await axios.get(
        'https://www.anapioficeandfire.com/api/books?pageSize=30'
      );
  
      setBooks(response.data);
    };

    const fetchCharacters = async () => {
        const response = await axios.get(
          'https://www.anapioficeandfire.com/api/characters?page=1&pageSize=100'
        );
    
        setCharacters(response.data);
      };

    return (
        <>
        <div className={ styles.container }>
            <ul className={ styles.headers }>
                <li><h1>Game of Thrones Books</h1></li>
                <li><h5>GoT lovers only!</h5></li>
                    <button 
                        className={ styles.button } 
                        onClick={ fetchBooks }>Vezi cartile GoT
                    </button>
                    <button 
                        className={ styles.button } 
                        onClick={ fetchCharacters }>Vezi personajele GoT
                    </button>
                
            </ul>
        </div>
          <div className={ styles.books }>
            {books &&
              books.map((book, index) => {
                const cleanedDate = new Date(book.released).toDateString();
                const authors = book.authors.join(', ');
    
                return (
                  <div className={ styles.book } key={index}>
                    <h3>Book { index + 1 }</h3>
                    <h2>{ book.name }</h2>
    
                    <div className={ styles.details }>
                      <p>👨: { authors }</p>
                      <p>📖: { book.numberOfPages } pages</p>
                      <p>🏘️: { book.country }</p>
                      <p>⏰: { cleanedDate }</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={ styles.books }>
            {characters &&
              characters.map((character, index) => {
                // const cleanedDate = new Date(character.name).toDateString();
                const aliases = character.aliases.join(', ');
    
                return (
                  <div className={ styles.book } key={index}>
                    <h3>Character { index + 1 }</h3>
                    <h2>{ character.name }</h2>
    
                    <div className={ styles.details }>
                      <p>👨: { aliases }</p>
                      <p>📖: { character.gender } </p>
                      <p>🏘️: { character.playedBy }</p>
                      <p>⏰: { character.tvSeries }</p>
                    </div>
                  </div>
                );
              })}
          </div>
          </>
      );
    }
    
    export default GoTBooks;
    // const rootElement = document.getElementById('root');
    // ReactDOM.render(<GoTBooks />, rootElement);
    
