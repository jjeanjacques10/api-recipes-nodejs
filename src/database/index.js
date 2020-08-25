import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

import User from '../app/models/User';
import Category from '../app/models/Category';
import Attachment from '../app/models/Attachment';
import Recipe from '../app/models/Recipe';


const models = [
    User,
    Category,
    Attachment,
    Recipe,
]

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models
            .map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();