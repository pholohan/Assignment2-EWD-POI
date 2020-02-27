'use strict';

const ImageStore = require('./app/utils/image-store');
const Hapi = require('@hapi/hapi');
const result = require('dotenv').config();
if (result.error) {
    console.log('Error reading env file', result.error)
}

require('./app/models/db');

const server = Hapi.server({
    port: 3000,
    host: 'localhost'
});

const credentials = {
    cloud_name: process.env.name,
    api_key: process.env.key,
    api_secret: process.env.secret
};

async function init() {
    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/vision'));
    await server.register(require('@hapi/cookie'));
    await server.validator(require('@hapi/joi'));

    ImageStore.configure(credentials);

    server.views({
        engines: {
            hbs: require('handlebars')
        },
        relativeTo: __dirname,
        path: './app/views',
        layoutPath: './app/views/layouts',
        partialsPath: './app/views/partials',
        layout: true,
        isCached: false
    });

    server.auth.strategy('session', 'cookie', {
        cookie: {
            name: process.env.cookie_name,
            password: process.env.cookie_password,
            isSecure: false
        },
        redirectTo: '/',
    });


    server.auth.default('session');

    server.route(require('./routes'));
    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
}

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

init();