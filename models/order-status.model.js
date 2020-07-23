import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';

const orderStatusSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collation: { locale: 'tr', strength: 1, numericOrdering: true },
  },
);

// add plugin that converts mongoose to json
orderStatusSchema.plugin(toJSON);
orderStatusSchema.plugin(paginate);

/**
 * Check if order status title is duplicate
 *
 * @param {string} title - The orderstatus's title
 * @returns {Promise<boolean>}
 */
orderStatusSchema.statics.isDuplicate = async function (title) {
  const orderStatus = await this.findOne({ title });
  return !!orderStatus;
};

/**
 * @typedef OrderStatus
 */
const OrderStatus = mongoose.model('OrderStatus', orderStatusSchema);

export default OrderStatus;
