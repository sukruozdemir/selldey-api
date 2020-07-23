import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
    prices: [
      {
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    coverImage: {
      data: Buffer,
      contentType: String,
    },
    category: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'Category',
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

const Product = mongoose.model('Product', productSchema);

export default Product;
