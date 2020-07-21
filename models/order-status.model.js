import mongoose from 'mongoose';
import { toJSON } from './plugins';

const orderStatusSchema = mongoose.Schema(
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
const OrderStatus = mongoose.model('orderStatus', orderStatusSchema);

export default OrderStatus;
