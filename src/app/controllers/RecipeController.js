import Recipe from '../models/Recipe';
import * as Yup from 'yup';


class RecipeController {
    async index(request, response) {
        const { page = 1 } = request.query;

        const recipes = await Recipe.findAll({
            limit: 20,
            offset: ((page - 1) * 20)
        });

        return response.json(recipes);
    }

    async show(request, response) {
        const recipe = await Recipe.findByPk(request.params.id);

        return response.json(recipe);
    }

    async create(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().max(100).required(),
            preparation_instructions: Yup.string().required(),
            preparation_time: Yup.number().required(),
            portions: Yup.number().required(),
            category_id: Yup.number().required(),
            attachment_id: Yup.number(),
        }).noUnknown();

        try {
            const validFields = await schema.validate(request.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            const recipe = await Recipe.create({
                ...validFields,
                user_id: request.user_id,
            })

            return response.json(recipe);
        } catch (error) {
            return response.status(400).json({ error });
        }
    }

    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().max(100).required(),
            preparation_instructions: Yup.string().required(),
            preparation_time: Yup.number().required(),
            portions: Yup.number().required(),
            category_id: Yup.number().required(),
            attachment_id: Yup.number(),
        }).noUnknown();

        try {
            const recipe = await Recipe.findByPk(request.params.id);

            if (!recipe) {
                return response.status(400).json({ error: 'Receita não encontrada' });
            }

            const validFields = await schema.validate(request.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            await recipe.update(validFields);

            return response.json(recipe);
        } catch (error) {
            return response.status(400).json({ error });
        }

    }

    async delete(request, response) {
        const recipe = await Recipe.findByPk(request.params.id);

        if (!recipe) {
            return response.status(400).json({ error: 'Receita não encontrada' });
        }

        await recipe.destroy();

        return response.json({ message: 'Receita removida com sucesso' });
    }
}

export default new RecipeController();