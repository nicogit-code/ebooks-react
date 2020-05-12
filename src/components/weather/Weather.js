import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Weather.module.css';

function Weather() {

    const [temp, setTemp] = useState(null);

    async function getWeather() {
        const urlW = 'https://api.openweathermap.org/data/2.5/weather?q=Brasov,ro&appid=af588ac18f73c1ee8e2ddbd115f8ffe3';
        const res = await axios.get(urlW);
        const temp = res.data.main.temp;
        setTemp(temp);
    }

    useEffect (() => {
        getWeather();
    }, [])

    return (
        <div className={ styles.currentTemp }>
            <div>Temperatura curentă în Brașov: 
                {(temp-273.15).toFixed(1) + '\u00b0C'}
            </div>
        </div>
        
    )
}

export default Weather;