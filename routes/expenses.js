const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Add Expense
router.post('/', async (req, res) => {
  const { userId, amount, category, note, date } = req.body;

  try {
    const newExpense = await Expense.create({
      userId,
      amount,
      category,
      note,
      date,
    });
    res.status(201).json(newExpense);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error adding expense' });
  }
});

// Get All Expenses for a User
router.get('/:userId', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.params.userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching expenses' });
  }
});

// Update an Expense
router.put('/:id', async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error updating expense' });
  }
});

// Delete an Expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Expense deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error deleting expense' });
  }
});

module.exports = router;
