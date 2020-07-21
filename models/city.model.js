import mongoose from 'mongoose';
import { toJSON } from './plugins';

const citySchema = mongoose.Schema(
  {
    name: {
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
citySchema.plugin(toJSON);

/**
 * @typedef City
 */
const City = mongoose.model('city', citySchema);

export default City;
