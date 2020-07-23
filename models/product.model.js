import mongoose from 'mongoose';
import shortid from 'shortid';

import { toJSON, paginate } from './plugins';

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
        _id: {
          type: String,
          default: shortid.generate,
          unique: true,
        },
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
    site: {
      type: String,
      required: true,
    },
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

// add plugin that converts mongoose to json
productSchema.plugin(toJSON);
productSchema.plugin(paginate);

/**
 * Check if product title is duplicate
 *
 * @param {string} title - The product's title
 * @returns {Promise<boolean>}
 */
productSchema.statics.isTitleDuplicate = async function (title) {
  const province = await this.findOne({ title });
  return !!province;
};

/**
 * Check if product site is duplicate
 *
 * @param {string} site - The product's site url
 * @returns {Promise<boolean>}
 */
productSchema.statics.isSiteDuplicate = async function (site) {
  const product = await this.findOne({ site });
  return !!product;
};

const Product = mongoose.model('Product', productSchema);

export default Product;
