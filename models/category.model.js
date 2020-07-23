import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      index: 1
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

const Category = mongoose.model('Category', categorySchema);

export default Category;
