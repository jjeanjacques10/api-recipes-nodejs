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
            },
            {
                sequelize
            }
        )

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        })

        return this;
    }
}

export default User;