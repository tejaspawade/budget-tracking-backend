const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const Expense = require('../models/Expense');
const mongoose = require('mongoose');

// Get summary of budget and expenses for a given month
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { month } = req.query;  // Expects format YYYY-MM, e.g., '2025-04'

  if (!month) {
    return res.status(400).json({ msg: 'Month parameter is required' });
  }

  try {
    // Fetch user's budget for the given month
    const budget = await Budget.findOne({ userId, month });
    if (!budget) {
      return res.status(404).json({ msg: 'Budget not found for the specified month' });
    }

    // Fetch expenses for the given user and month
    const expenses = await Expense.find({
      userId,
      date: { $gte: new Date(`${month}-01`), $lt: new Date(`${month}-01`).setMonth(new Date(`${month}-01`).getMonth() + 1) }
    });

    // Calculate total expenses for the month
    const totalSpent = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    // Breakdown of expenses by category
    const spentByCategory = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    // Calculate remaining budget
    const remaining = budget.totalAmount - totalSpent;

    // Prepare the summary data
    const summary = {
      month,
      totalBudget: budget.total,
      totalSpent,
      remaining,
      spentByCategory,
    };

    res.json(summary);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching summary' });
  }
});

module.exports = router;
