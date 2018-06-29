const { expressSetup } = require('./express');
const { socketSetup } = require('./socket.io');
const { rethinkSetup } = require('./rethinkdb');

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
