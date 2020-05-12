import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from './UserContext';
import { Switch, Redirect } from 'react-router-dom';

import styles from './Register.module.css';


const errorMessages = {
    'username':'Please choose a username',
    'password':'Please choose a password',
    'retype-password':'Please retype password',
    'different-passwords': 'You must enter the same password twice',
    'no-numbers': 'Your username connot contain special characters',
    'email':'This email is already in use. Login or try a different email adress',
};

function Register() {
    const [formData, setFormData] = useState({
        'username':'',
        'email':'',
        'password':'',
        'retype-password':''
    });

    const [formError, setFormError] = useState({
        'username':'',
        'email':'',
        'password':'',
        'retype-password':'',
        'different-passwords':''
    });

    const [globalErrorMessage, setGlobalError] = useState('');
    const[isSuccessfull, setSuccessfull] = useState(false);
    const[isFilled, setFilled] = useState(false);
    const { setUser } = useContext(UserContext);

    async function handleSubmit(e) {
        e.preventDefault(); 

        setGlobalError('');
        
        const isInvalid = validateData() || await checkUser();

        if(!isInvalid) {
            setFilled(false);
            let res;
            try {
            // res = await axios.post('http://localhost:3001/users', formData);
            res = await axios.post('/users', formData);
                console.log(res);
                setUser(res.data);
                localStorage.setItem('user', JSON.stringify(res.data));
                setSuccessfull(true);
            } catch(e) {
                console.log(e.res.data.message, res);
            }
        }
    }

    async function checkUser(e) {
        const user = await axios.get('/users?username=' + formData.username)
                                .then(res => res.data)
        if(user.length) {
            setGlobalError("User already exists");
            return true;
        }
        return false;
    }

    function validateData() {
        const inputs = ['username', 'email', 'password', 'retype-password'];
        const newError = { ...formError };
        let isInvalid = false;

        for(const input of inputs) {
            if(!formData[input]) {
                newError[input] = errorMessages[input];
                isInvalid = true;
            }
        }

        if(!/^[a-zA-Z0-9]+$/i.test(formData.username)) {
            newError.username = errorMessages['no-numbers'];
            isInvalid = true;
        }

        if(formData.password !== formData['retype-password']) {
            newError['different-passwords'] = errorMessages['different-passwords'];
            isInvalid = true;
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
                <h1>Creare cont</h1>

                {(globalErrorMessage ?
                    <div className="alert alert-danger" role="alert">
                        { globalErrorMessage }
                    </div>
                : null)}

                {(isSuccessfull ?
                <>
                    <div className="alert alert-success" role="alert">
                        Contul tau a fost creat cu succes!
                    </div>
                    <Switch>
                        {/* <Route path='/login' component={UserProfile}/> */}
                        <Redirect from='/register' to ='/'/>
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
                        <label htmlFor="email"></label>
                        <input 
                        onChange={ handleInputChange } 
                        value={ formData.email } 
                        type="text" 
                        className={'form-control' + (formError.email ? ' is-invalid' : '')} 
                        id="email" 
                        placeholder="email@example.com"
                        />
                        <div className="invalid-feedback">
                            { formError.email }
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
                        placeholder="Password"
                        />
                        <div className="invalid-feedback">
                            { formError.password }
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="retype-password"></label>
                        <input 
                        onChange={ handleInputChange } 
                        value={ formData['retype-password'] } 
                        type="password" 
                        className={'form-control' + (formError['retype-password'] || formError['different-passwords'] ? ' is-invalid' : '')} 
                        id="retype-password"
                        placeholder="Retype Password"
                        />
                        <div className="invalid-feedback">
                            { formError['retype-password'] }
                            { formError['retype-password'] ? <br/> : '' }
                            { formError['different-passwords'] }
                        </div>
                    </div>

                    <button type="submit" className={ styles.button } disabled={ !isFilled }>Register</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
