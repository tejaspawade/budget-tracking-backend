const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  month: {
    type: String, // e.g., "2025-04"
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  categoryLimits: {
    type: Map,
    of: Number, // e.g., { food: 200, rent: 400 }
    default: {},
  },
}, { timestamps: true });

module.exports = mongoose.model('Budget', budgetSchema);
