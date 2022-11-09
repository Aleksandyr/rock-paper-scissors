import { Optional } from 'sequelize';
import { Model, Table, Column, DataType, Default, HasOne } from 'sequelize-typescript';
import bcrypt from 'bcrypt';

import { Stats, StatsAttributes } from './Stats';
import { UserInterface } from '../../types';
interface UserCreationAttributes extends Optional<UserInterface, 'id'> {
  stats?: Optional<StatsAttributes, 'id'>;
}

@Table
class User extends Model<UserInterface, UserCreationAttributes> {
  @Column(DataType.TEXT)
  declare username: string;

  @Column(DataType.TEXT)
  declare email: string;

  @Column(DataType.TEXT)
  declare password: string;

  @HasOne(() => Stats, 'userId')
  declare stats: Stats;

  declare token: string;

  comparePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}

export { User };
