const express = require('express')
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET api/items
// @desc Get All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
        .sort({ date: -1 }) // 1 is ascending, -1 is descending
        .then(items => res.json(items))
});

module.exports = router;