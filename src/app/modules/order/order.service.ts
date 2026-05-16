import { QueryBuilder } from '../../builder/QueryBuilder';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrder = async (payload: IOrder): Promise<IOrder> => {
  const result = await Order.create(payload);
  return result;
};

const getAllOrders = async (query: Record<string, unknown>) => {
  const orderQuery = new QueryBuilder(Order.find().populate('product'), query)
    .search(['customerName', 'phone', 'packageName'])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await orderQuery.modelQuery;
  const meta = await orderQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleOrder = async (id: string): Promise<IOrder | null> => {
  const result = await Order.findById(id).populate('product');
  return result;
};

const updateOrderStatus = async (
  id: string,
  payload: { status: string },
): Promise<IOrder | null> => {
  const result = await Order.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const getAnalytics = async () => {
  const statusCounts = await Order.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 },
      },
    },
  ]);

  const counts: Record<string, number> = {
    total: 0,
    Pending: 0,
    Confirmed: 0,
    Delivered: 0,
    Cancelled: 0,
  };

  statusCounts.forEach((item: any) => {
    if (item._id) counts[item._id] = item.count;
    counts.total += item.count;
  });

  const totalRevenueResult = await Order.aggregate([
    { $match: { status: 'Delivered' } },
    { $group: { _id: null, total: { $sum: '$totalPrice' } } },
  ]);
  const totalRevenue = totalRevenueResult.length > 0 ? totalRevenueResult[0].total : 0;

  const now = new Date();
  const last30Days = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const dailyTrend = await Order.aggregate([
    {
      $match: {
        createdAt: { $gte: last30Days },
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            format: '%Y-%m-%d',
            date: '$createdAt',
            timezone: 'Asia/Dhaka',
          },
        },
        orders: { $sum: 1 },
        revenue: { $sum: '$totalPrice' },
      },
    },
    { $sort: { _id: 1 } },
  ]);

  return {
    summary: {
      totalOrders: counts.total,
      pendingOrders: counts.Pending,
      confirmedOrders: counts.Confirmed,
      deliveredOrders: counts.Delivered,
      cancelledOrders: counts.Cancelled,
      totalRevenue,
    },
    dailyTrend,
  };
};

export const OrderService = {
  createOrder,
  getAllOrders,
  getSingleOrder,
  updateOrderStatus,
  getAnalytics,
};
