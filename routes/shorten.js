const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');

const Url = require('../models/urlModel');

// @route        POST /api/shorten
// @desc         Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = process.env.BASE_URL;

  // Check if longUrl and baseUrl are valid
  if (!validUrl.isUri(longUrl)) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid original URL'
    });
  } else if (!validUrl.isUri(baseUrl)) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid base URL'
    });
  }

  // Find existing longUrl, if not exists, create new code
  try {
    let url = await Url.findOne({ longUrl });

    if (url) {
      res.status(200).json(url);
    } else {
      const urlCode = shortid.generate();
      const shortUrl = `${baseUrl}/${urlCode}`;

      url = await Url.create({
        _id: urlCode,
        longUrl,
        shortUrl
      });

      res.status(201).json(url);
    }
  } catch (err) {
    console.error(err);

    res.status(500).json({
      status: 'fail',
      message: 'Server error occurred'
    });
  }
});

module.exports = router;