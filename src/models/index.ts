import User from './user/user-model'
import Orders from './orders/orders-model';
import Customers from './customers/customers-model';

// связь между заказами и заказчиками
Customers.hasMany(Orders, {
  foreignKey: 'customerId',
  onDelete: 'CASCADE'
});

Orders.belongsTo(Customers, {
  foreignKey: 'customerId'
});

// связь между пользователем и заказами
User.hasMany(Orders, { foreignKey: 'userId' });
Orders.belongsTo(User, { foreignKey: 'userId' });

// связь между пользователем и заказчиками
User.hasMany(Customers, { foreignKey: 'userId' });
Customers.belongsTo(User, { foreignKey: 'userId' });

export {
  User,
  Orders,
  Customers
}