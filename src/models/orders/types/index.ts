export type StatusType = 'work' | 'modification' | 'confirmation' | 'completed' | 'cancelled';

export type IOrders = {
  id: number;
  name: string;
  price: string;
  status: StatusType;
  description?: string;
  time: string[];
  customerId: number;
  userId?: number;
}