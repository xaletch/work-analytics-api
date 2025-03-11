import { DataTypes, Model } from "sequelize";
import { IOrders } from "./types";
import sequelize from "@/config/db";

class Orders extends Model<IOrders> {}

Orders.init(
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
    price: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('work', 'modification', 'confirmation', 'completed', 'cancelled'),
      allowNull: false,
      defaultValue: 'work'
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: [],
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
        key: 'id'
      },
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
    modelName: 'Orders',
    tableName: 'orders',
    timestamps: true,
    defaultScope: {
      attributes: { exclude: ["updatedAt", "createdAt", "customerId", "userId"] }
    }
  }
)

export default Orders;