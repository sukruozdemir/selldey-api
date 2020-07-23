import mongoose from 'mongoose';

const provinceSchema = new mongoose.Schema(
  {
    name: {
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

/**
 * Get Provinces By City
 * @param {object} city
 * @returns {Promise<Array<Province>>}
 */
provinceSchema.statics.findByCity = async function (city) {
  const provinces = await this.find({ city }).sort('name').lean();
  return provinces;
};

const Province = mongoose.model('Province', provinceSchema);

export default Province;
