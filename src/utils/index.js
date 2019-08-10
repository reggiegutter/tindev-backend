const axios = require('axios');

const apiUrl = 'https://api.github.com';

const api = axios.create({
  baseURL: apiUrl,
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
});

module.exports = api;
