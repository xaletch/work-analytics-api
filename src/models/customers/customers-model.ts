import { DataTypes, Model } from "sequelize";
import { ICustomer } from "./types";
import sequelize from "@/config/db";

class Customers extends Model<ICustomer> {};

Customers.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tg: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    freelance: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '#ff8904',
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      },
    },
  },
  {
    sequelize,
    modelName: 'Customers',
    tableName: 'customers',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["updatedAt", "createdAt", "userId"] }
    }
  }
);

export default Customers;