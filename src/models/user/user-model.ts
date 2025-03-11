import { DataTypes, Model } from 'sequelize';
import { IUser } from './types';

import sequelize from '@/config/db';

class User extends Model<IUser> {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'user',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["updatedAt", "password", "createdAt"] }
    }
  }
);

export default User;