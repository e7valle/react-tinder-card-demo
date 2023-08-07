// import React, { useState, useEffect } from 'react';
const dotenv = require('dotenv');
dotenv.config();
// var express=require('express');


const axios = require('axios');

const options = {
    method: 'GET',
    url: 'https://api.yelp.com/v3/businesses/search?location=Seattle&term=restaurants&radius=8000&categories=&price=4&sort_by=best_match&limit=20',
    headers: {
        accept: 'application/json',
        Authorization: process.env.REACT_APP_API_KEY
    }
};

axios
    .request(options)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.error(error);
    });

// const state = {
//     term: 'restaurant',
//     location: 'Seattle',
//     radius: 8046,
//     price: 1,
//     open_now: true

// }

// const [locationSearched, setLocationSearched] = useState('');
// // const [businesses, setBusinesses] = useState([]);
// // const [locationRadius, setLocationRadius] = useState('');

// // const handleLocationChange = (e) => {
// //     setLocationSearched(e.target.value);


// const handleSearch = () => {
// axios
//     .get('https://api.yelp.com/v3/businesses/search', {
//         headers: {
//             Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
//         },
//         params: {
//         location: {locationSearched},
//         format:'json'
//         // radius: {locationRadius}
//     }
//     .then((response) => {
//         console.log(response.data.businesses);
//     })
//     .catch((err) => {
//         console.log ('error');
//     })
// });
// };
// };