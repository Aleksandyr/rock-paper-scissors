import { Optional } from 'sequelize';
import { Model, Table, Column, DataType, Default, HasOne } from 'sequelize-typescript';
import { Stats } from './Stats';

export interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

@Table
class User extends Model<UserAttributes, UserCreationAttributes> { 
    @Column(DataType.TEXT)
    declare username: string;

    @Column(DataType.TEXT)
    declare email: string;

    @Column(DataType.TEXT)
    declare password: string;

    @HasOne(() => Stats)
    declare stats: Stats;
}

export { User };