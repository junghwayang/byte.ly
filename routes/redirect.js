const express = require('express');
const router = express.Router();

const Url = require('../models/urlModel');

// @route        GET /:code
// @desc         Redirect to original URL
router.get('/:code', async (req, res) => {
  try {
    const url = await Url.findById(req.params.code);

    if (!url) {
      return res.status(404).json({
        status: 'fail',
        message: 'URL not found!'
      });
    }

    res.redirect(url.longUrl);
  } catch (err) {
    console.error(err);
    
    res.status(500).json({
      status: 'fail',
      message: 'Server error occurred'
    });
  }
});

module.exports = router;