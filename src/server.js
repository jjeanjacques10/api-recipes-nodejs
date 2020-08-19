import 'dotenv/config';

import express from 'express';
import routes from './routes';
import path from 'path';

import './database';

const app = express();

app.use(express.json());

app.use(
    '/attachments',
    express.static(path.resolve(__dirname, '..', 'tmp', 'uploads'))
);

app.use(routes);

app.listen(3000);