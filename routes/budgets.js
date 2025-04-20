const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');

// Create Budget
router.post('/', async (req, res) => {
  const { userId, month, totalAmount, categoryLimits } = req.body;

  try {
    const newBudget = await Budget.create({
      userId,
      month,
      totalAmount,
      categoryLimits,
    });
    console.log('newBudget-', newBudget)
    res.status(201).json(newBudget);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating budget' });
  }
});

// Get All Budgets for User
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const budgets = await Budget.find({ userId });
    res.json(budgets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error fetching budgets' });
  }
});

// Update a Budget
router.put('/:id', async (req, res) => {
  try {
    const updated = await Budget.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error updating budget' });
  }
});

// Delete a Budget
router.delete('/:id', async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Budget deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error deleting budget' });
  }
});

module.exports = router;
