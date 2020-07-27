import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';

import PaymentTypes from './../enumerations/payment-type';

const orderSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      maxlength: 13,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    address: {
      type: String,
    },
    paymentType: {
      type: String,
      enum: Object.values(PaymentTypes),
    },
    orderNote: {
      type: String,
    },
    ordered: {
      type: Date,
      default: new Date(),
    },
    city: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'City',
    },
    province: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Province',
    },
    product: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Product',
    },
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
orderSchema.plugin(paginate);

/**
 * @typedef Order
 */
const Order = mongoose.model('Order', orderSchema);

export default Order;
