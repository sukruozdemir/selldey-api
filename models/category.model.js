import mongoose from 'mongoose';
import { paginate, toJSON } from './plugins';

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: 1,
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
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

/**
 * Check if email is taken
 *
 * @param {string} email - The user's email
 * @param {ObjectId} [excludeUserId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
categorySchema.statics.isDuplicate = async function (title) {
  const user = await this.findOne({ title });
  return !!user;
};

const Category = mongoose.model('Category', categorySchema);

export default Category;
