const pool = require('../db/config.js');
const express = require('express');
const router = express.Router();

router.get('/', async (res) => {
        const result = await pool.query("select now()")
        res.send(result.rows[0])
})
module.exports = router;