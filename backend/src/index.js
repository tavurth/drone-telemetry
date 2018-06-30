process.env.NODE_PATH = __dirname;
require('module').Module._initPaths(); // eslint-disable-line no-underscore-dangle

const { expressSetup } = require('driver/express');
const { socketSetup } = require('driver/socket.io');
const { rethinkSetup } = require('driver/rethinkdb');

async function setup() {
    const app = expressSetup();

    await rethinkSetup();
    await socketSetup(app);

    // Wait a little bit
    await new Promise(res => setTimeout(res, 500));

    app.listen(3001, function() {
        console.info('listening on *:3001');
    });
}

setup();
