import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';

const citySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    no: {
      type: Number,
      unique: true,
    },
  },
  {
    timestamps: true,
    collation: { locale: 'tr', strength: 1, numericOrdering: true },
  },
);

// add plugin that converts mongoose to json
citySchema.plugin(toJSON);
citySchema.plugin(paginate);

/**
 * Check if city title is duplicate
 *
 * @param {string} title - The city's title
 * @returns {Promise<boolean>}
 */
citySchema.statics.isDuplicate = async function (title) {
  const city = await this.findOne({ title });
  return !!city;
};

/**
 * @typedef City
 */
const City = mongoose.model('City', citySchema);

export default City;
