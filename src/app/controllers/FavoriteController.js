import Recipe from '../models/Recipe';

class FavoriteController {
    async create(request, response) {
        const { recipe_id } = request.params;

        const recipe = await Recipe.findByPk(recipe_id);

        if (!recipe) {
            return response.status(400).json({ erro: 'Receita não encontrada.' });
        }

        await recipe.addUser(request.user_id);

        return response.json({ message: 'Receita favoritada com sucesso.' });
    }

    async index(request, response) {

        const favoriteRecipes = await Recipe.findAll({
            include: [{
                attributes: [],
                association: 'users',
                where: {
                    id: request.user_id
                }
            }]
        });

        return response.json(favoriteRecipes);
    }

    async delete(request, response) {
        const { recipe_id } = request.params;

        const recipe = await Recipe.findByPk(recipe_id);

        if (!recipe) {
            return response.status(400).json({ erro: 'Receita não encontrada.' });
        }

        await recipe.removeUser(request.user_id);

        return response.json({ message: 'Receita removida dos favoritos' })
    }
}

export default new FavoriteController();