import { Optional } from 'sequelize';
import {
  Model,
  Default,
  Column,
  DataType,
  Table,
  BelongsTo,
  ForeignKey,
  AllowNull,
  Unique
} from 'sequelize-typescript';

import { User } from './User';

export interface StatsAttributes {
  id: number;
  wins: number;
  losses: number;
  draws: number;
}

interface StatsCreationAttributes
  extends Optional<StatsAttributes, 'id' | 'draws' | 'wins' | 'losses'> {
  userId?: number;
}

@Table
class Stats extends Model<Stats, StatsCreationAttributes> {
  @Default(0)
  @Column(DataType.NUMBER)
  declare wins: number;

  @Default(0)
  @Column(DataType.NUMBER)
  declare losses: number;

  @Default(0)
  @Column(DataType.NUMBER)
  declare draws: number;

  @ForeignKey(() => User)
  @AllowNull(false)
  @Unique(true)
  @Column(DataType.NUMBER)
  declare userId: number;

  @BelongsTo(() => User, 'userId')
  declare user: User;
}

export { Stats };
