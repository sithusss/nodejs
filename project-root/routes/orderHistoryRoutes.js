const express = require('express');
const router = express.Router();

// Scenario 4: Slow response in order history
router.get('/order-history', (req, res) => {
  setTimeout(() => {
    res.json([{ id: 1, item: "Product A" }]);
  }, 150000); // 2.5 minutes delay
});

module.exports = router;
