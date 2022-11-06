import {Sequelize} from 'sequelize-typescript';
import path from 'path';
import { User } from './models/User';
import { Stats } from './models/Stats';

const db = new Sequelize({
    logging: false,
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', '..', 'db.sqlite'),
    models: [User, Stats]
});

export {User, Stats, db};