const mongoose = require('mongoose');

const saleSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    category: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale; 