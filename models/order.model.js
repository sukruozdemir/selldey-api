import mongoose from 'mongoose';
import { toJSON } from './plugins';

const orderSchema = mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
      index: true,
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
const Order = mongoose.model('order', orderSchema);

export default Order;
