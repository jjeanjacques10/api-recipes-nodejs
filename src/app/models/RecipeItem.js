import Sequelize, { Model } from 'sequelize';

class RecipeItem extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING(60),
                quantity: Sequelize.STRING(100),
            },
            {
                sequelize
            }
        )

        return this;
    }

    static associate(models) {
        this.belongsTo(models.Recipe, { as: 'recipe', foreignKey: 'recipe_id' });
    }
}

export default RecipeItem;