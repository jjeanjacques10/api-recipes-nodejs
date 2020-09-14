import { Router, response } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = Router();

const upload = multer(multerConfig);

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import CategoryController from './app/controllers/CategoryController';
import AttachmentController from './app/controllers/AttachmentController';
import RecipeController from './app/controllers/RecipeController';

import authMiddleware from './app/middlewares/authMiddleware';
import FavoriteController from './app/controllers/FavoriteController';

routes.post('/auth', AuthController.create);
routes.post('/users', UserController.create);

routes.use(authMiddleware);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.put('/users/', UserController.update);

routes.get('/categories', CategoryController.index);

routes.post('/attachments', upload.single('file'), AttachmentController.create);

routes.get('/recipes', RecipeController.index);
routes.get('/recipes/:id', RecipeController.show);
routes.put('/recipes/:id', RecipeController.update);
routes.delete('/recipes/:id', RecipeController.delete);
routes.post('/recipes', RecipeController.create);

routes.post('/favorites/:recipe_id', FavoriteController.create);
routes.get('/favorites', FavoriteController.index);
routes.delete('/favorites/:recipe_id', FavoriteController.delete);

export default routes;