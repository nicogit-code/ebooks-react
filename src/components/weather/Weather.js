import React from 'react';
import axios from 'axios';

function Weather() {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=Brasov,ro&appid=c7da641777760054e5ca6164eb47580a';
    const apiKey = 'af588ac18f73c1ee8e2ddbd115f8ffe3';
    const location = 'Brasov,ro';
    fetch(url)
    .then((res) => res.json())
    .then(temp);

    function temp(data) {
        const temperatura = data.main.temp - 273.15;
        // const span = document.querySelector('[data-temperature]');
        // span.innerHTML = temperatura.toFixed(1) + '&deg;C';
    }

    return (
        <>
        <div>
            <h5>Temperatura in Brasov, Romania</h5>
        </div>
        <div>
            <input className="wrapper"
                // onChange = { handleInputChange }
                value="text"
                type="text"
                placeholder="">
            </input>
        </div>
        </>
    )
}

export default Weather;