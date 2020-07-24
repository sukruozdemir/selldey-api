import mongoose from 'mongoose';
import { toJSON, paginate } from './plugins';

const provinceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'City',
    },
  },
  {
    timestamps: true,
    collation: { locale: 'tr', strength: 1, numericOrdering: true },
  },
);

// add plugin that converts mongoose to json
provinceSchema.plugin(toJSON);
provinceSchema.plugin(paginate);

/**
 * Check if province title & city is duplicate
 *
 * @param {string}   title - The province's title
 * @param {ObjectId} city  - The city's id
 * @returns {Promise<boolean>}
 */
provinceSchema.statics.isDuplicate = async function (title, city) {
  const province = await this.findOne({ title, city });
  return !!province;
};

const Province = mongoose.model('Province', provinceSchema);

export default Province;
