import React from 'react';
import ReactDOM from 'react-dom';
import basePath from './api/basePath';


// testowanie CORS
async function login() {
    try {
        const response = await basePath.get('/login');
        console.log(response);
    } catch (error) {
        console.error(error);
    }
}
login();
//////////////////////////

