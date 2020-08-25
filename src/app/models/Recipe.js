import Sequelize, { Model } from 'sequelize';

class Recipe extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING(100),
                preparation_instructions: Sequelize.TEXT,
                preparation_time: Sequelize.INTEGER,
                portions: Sequelize.INTEGER,
            },
            {
                sequelize
            }
        )

        return this;
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Category, { foreignKey: 'category_id', as: 'category' });
        this.belongsTo(models.Attachment, { foreignKey: 'attachment_id', as: 'attachment' });
    }
}

export default Recipe;