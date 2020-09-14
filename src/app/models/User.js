import Sequelize, { Model } from 'sequelize';
import bcryptjs from 'bcryptjs';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING(70),
                email: Sequelize.STRING(120),
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
                status: Sequelize.BOOLEAN,
                is_admin: Sequelize.BOOLEAN,
            }, { sequelize }
        )

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        })

        return this;
    }

    checkPassword(password) {
        return bcryptjs.compare(password, this.password_hash);
    }

    static associate(models) {
        this.belongsToMany(models.Recipe, {
            as: 'favorites',
            through: 'user_favorites',
            foreignKey: 'user_id',
        });
    }

}

export default User;