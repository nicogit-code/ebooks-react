import React from 'react';
import axios from 'axios';
import { apiDict } from '../../api/DictApi';
import styles from './Dictionary.module.css'

function Dictionary() {
    // const url = 'https://wordsapiv1.p.rapidapi.com/words/';
    const apiKey = 'ffe7b2bb45msh4ee307b5ab28997p1dfb68jsn8ad031d2a5e4';
    const definitionList = document.getElementById("definitions");
    // const fetchData = async() => {
    //     try {
    //         const res = await axios.get(url);

    //         console.log(res);
    //     } catch(e) {

    //     }
    // }

    function getDefinitions(word) {
        fetch("https://wordsapiv1.p.rapidapi.com/words/?page=1&hasDetails=hasDetails", {
	        "method": "GET",
	        "headers": {
		    "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
		    "x-rapidapi-key": "ffe7b2bb45msh4ee307b5ab28997p1dfb68jsn8ad031d2a5e4"
	}
})
        .then(response => {
            console.log(response);
        })
        .catch(e => {
            console.log(e);
        });
    } 

    function getSuggestions(input) {
        const url = `https://wordsapiv1.p.rapidapi.com/words/?letterPattern=^${input}.*&hasDetails=definitions`;
        return fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": apiKey
          }
        }).then(resp => resp.json());
      }
      
      /*
       * Get the definition of a word.
       */
      function getDefinitions(term) {
        const url = `https://wordsapiv1.p.rapidapi.com/words/${term}`;
        return fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": apiKey
          }
        })
          .then(resp => resp.json())
          .then(resp => {
            return resp.results;
          });
      }
      

      function showDefinitions(definitions) {
        definitionList.innerHTML = "";
        definitions.forEach(definition => {
          const li = document.createElement("li");
          li.textContent = `${definition.partOfSpeech} - ${definition.definition}`;
          definitionList.appendChild(li);
        });
      }
      
    //   autoComplete({
    //     selector: "#user-input",
    //     minChars: 1,
    //     source: function(term, suggest) {
    //       getSuggestions(term).then(response => {
    //         suggest(response.results.data);
    //       });
    //     },
    //     onSelect: function(e, term, item) {
    //       getDefinitions(term).then(showDefinitions);
    //     }
    //   });


    return (
        <>
            <div className={ styles.form }>
                <div className="row justify-content-center align-items-center">
                    <div id="word-search" className="col-md-7">
                        <h3>Book-tionary</h3>
                        <h5>Comprehensive Word Information</h5>
                        {/* <h6 className="text-center">Get information on different words</h6> */}
                    </div>
                </div>
                <div id="form-row" className="row sticky-top">
                    <div className="col">
                        <form id="main-form">
                            <fieldset>
                                <label htmlFor="word">Enter Word</label>
                                <input id='word-input' type="text" className={"form-control"} name="word" placeholder="abibliophobia"/>
                                <button type="submit" className={ styles.button }>Cauta</button>
                            </fieldset>
                        </form>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <ul id="word-info" className="list-unstyled"></ul>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dictionary;
