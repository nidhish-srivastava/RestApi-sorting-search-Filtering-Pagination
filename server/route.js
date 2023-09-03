const express = require('express')
const router = express.Router()
const {getAllProducts,getSelected} = require('./controller')



router.route('/product').get(getAllProducts)
router.route('/product/one').get(getSelected)

module.exports = router