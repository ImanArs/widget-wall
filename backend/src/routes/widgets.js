const express = require('express')
const router = express.Router()
const { widgets } = require('../lib/data')

router.get('/', (req, res) => {
  res.json(widgets)
})

module.exports = router
