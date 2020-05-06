import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import { Switch, Redirect } from 'react-router-dom';

import styles from './Login.module.css';


const errorMessages = {
    'username':'Please type username',
    'password':'Please type password',
};

export default function Login() {

    const [formData, setFormData] = useState({
        'username':'',
        'password':'',
    });

    const [formError, setFormError] = useState({
        'username':'',
        'password':'',

    });

    const [globalErrorMessage, setGlobalError] = useState('');
    const[isSuccessfull, setSuccessfull] = useState(false);
    const[isFilled, setFilled] = useState(true);
    // const [shouldValidate, setShouldValidate] = useState(false);
    const { setUser } = useContext(UserContext);

    async function handleSubmit(e) {
        e.preventDefault(); 

        setGlobalError('');
        setSuccessfull(false);
        
        const isInvalid = validateData();

        if(!isInvalid) {
            setFilled(false);
            // let res;
            try {
                // const res = await axios.post('http://localhost:3001/login', formData);
                const res = await axios.post('/login', formData);
                setUser(res.data);
                console.log(res);
                localStorage.setItem('user', JSON.stringify(res.data));
                setSuccessfull(true);
            } catch(e) {
                setGlobalError(e.response.data.message);
            }
        }
    }

    function validateData() {
        const inputs = ['username', 'password'];
        const newError = { ...formError };
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        setFormError(newError);
        return isInvalid;
    }

    function handleInputChange(e) {

        setFilled(true);

        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        });

        const newError = { ...formError, [e.currentTarget.id]:'',};
        if(e.currentTarget.id === 'password' || e.currentTarget.id === 'retype-password') {
            newError['different-passwords'] = '';
        }

        setFormError(newError)
    }

    return (
        <div className="container">
            <div className={ styles.formBody }>
                <h1>Login</h1>

                {(globalErrorMessage ?
                    <div className="alert alert-danger" role="alert">
                        { globalErrorMessage }
                    </div>
                : null)}

                {(isSuccessfull ?
                <>
                    <div className="alert alert-success" role="alert">
                        Te-ai autentificat cu succes!
                    </div>
                    <Switch>
                        <Redirect from='/login' to ='/profile/'/>
                    </Switch>
                    
                </>
                : null)}
                <form onSubmit={ handleSubmit }>

                    <div className="form-group">
                        <label htmlFor="username"></label>
                        <input 
                            onChange={ handleInputChange } 
                            value={ formData.username } 
                            type="text" 
                            className={'form-control' + (formError.username ? ' is-invalid' : '')} 
                            id="username" 
                            placeholder="Enter username"
                        />
                        <div className="invalid-feedback">
                            { formError.username }
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input 
                            onChange={ handleInputChange } 
                            value={ formData.password } 
                            type="password" 
                            className={'form-control' + (formError.password ? ' is-invalid' : '')}  
                            id="password"
                            placeholder="Enter password"
                        />
                        <div className="invalid-feedback">
                            { formError.password }
                        </div>
                    </div>
                    <ul className={ styles.social }>
                        <li>
                            <a href="https://www.facebook.com" className={ styles.socialBtn }>
                                <i className="fa fa-facebook fa-fw"></i> Login with Facebook
                            </a>
                        </li>
                        <li>
                            <a href="https://twitter.com/login/error?username_or_email=nicki_mamu%40yahoo.com&redirect_after_login=%2F" className={ styles.socialBtn }>
                                <i className="fa fa-twitter fa-fw"></i> Login with Twitter
                            </a>
                        </li>
                        <li>
                            <a href="https://myaccount.google.com/profile" className={ styles.socialBtn }><i className="fa fa-google fa-fw">
                            </i> Login with Google+
                        </a>
                        </li>
                    </ul>

                    <button type="submit" className={ styles.button } disabled={ !isFilled }>Login</button>

                    {/* <div className="bottom">
                        <ul className={ styles.options }>
                            <li>
                                <a href="/" className="btn">Creeaza cont</a>
                            </li>
                            <li className={ styles.separator }></li>
                            <li>
                                <a href="/" className="btn">Ai uitat parola?</a>
                            </li>
                        </ul>
                    </div> */}
                </form>
            </div>
        </div>
        
    )
}
