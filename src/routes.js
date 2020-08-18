import { Router, response } from 'express';

const routes = Router();

import UserController from './app/controllers/UserController';

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.create);
routes.put('/users/:id', UserController.update);

export default routes;