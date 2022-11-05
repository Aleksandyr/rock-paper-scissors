import {Sequelize} from 'sequelize-typescript';
import path from 'path';

const db = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', '..', 'db.sqlite')
});

export default db;