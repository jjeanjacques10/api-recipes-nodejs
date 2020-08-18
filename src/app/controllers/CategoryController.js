import Category from '../models/Category';

class CategoryController {
    async index(request, response) {
        const { page = 1 } = request.query;

        const filter = {
            offset: ((page - 1) * 20),
            limit: 20,
        }

        const categories = await Category.findAll({
            ...filter,
            order: ['description'],
        });

        return response.json(categories);
    }
}

export default new CategoryController();