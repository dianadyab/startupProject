
'use strict';


const express = require('express');
const router = express.Router();


const { getSubmitData } = require('../controllers/submitController');
router.post('/',getSubmitData );




module.exports = router;
