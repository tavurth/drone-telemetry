const express = require('express');
const appBuilder = require('http');

function expressSetup() {
    const app = express();
    return appBuilder.Server(app);
}

module.exports = {
    expressSetup,
};
