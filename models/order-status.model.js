import mongoose from 'mongoose';
import { toJSON } from './plugins';

const orderStatusSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    collation: { locale: 'tr', strength: 1, numericOrdering: true },
  },
);

// add plugin that converts mongoose to json
orderStatusSchema.plugin(toJSON);

/**
 * @typedef OrderStatus
 */
const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);

export default OrderStatus;
