import sequelize, { Model, Sequelize } from 'sequelize';

class Attachment extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                file: Sequelize.STRING,
                url: {
                    type: Sequelize.VIRTUAL,
                    get() {
                        return `http://localhost:3000/attachments/${this.file}`;
                    }
                }
            }, { sequelize }
        )

        return this;
    }
}

export default Attachment;