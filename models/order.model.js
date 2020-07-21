import mongoose from 'mongoose';
import { toJSON } from './plugins';

const orderSchema = mongoose.Schema(
  {
    status: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'OrderStatus',
    },
  },
  {
    timestamps: true,
    collation: { locale: 'tr', strength: 1, numericOrdering: true },
  },
);

// add plugin that converts mongoose to json
orderSchema.plugin(toJSON);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

export default Order;
