const jwt = require('jsonwebtoken')
require('dotenv').config();
const bcrypt = require ('bcrypt');
const express = require('express');
const router = express.Router();
const pool = require('../db/config.js');

const JWT_SECRET = process.env.JWT_SECRET

router.post('/signup', async(req, res) => {
    const { username, password } = req.body
    const hash = await bcrypt.hash(password, 10)
    const insert = 'INSERT INTO users (username, passwd) VALUES ($1, $2) RETURNING id';
    const insertResult = await pool.query(insert, [username, hash]);
    const id = insertResult.rows[0].id
    const sql = 'SELECT * FROM users WHERE id = $1';
    const result = await pool.query(sql, [id]);
    const user = result.rows[0];
    if (result) {
        const token = jwt.sign({ id: user.id, 
            username:user.username,
            team_id: user.team_id }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );
            res.status(200)
            res.json({
                success: true,
                message: 'Signup successful',
                token,
                username: user.username,
            });
    } else {
        res.status(403).json({ message: 'Failed', data: username });
    }
});

router.post('/login', async(req, res) => {
    const { username, password } = req.body
    const sql = 'SELECT * FROM users WHERE username = $1';
    const result = await pool.query(sql, [username]);
    const user = result.rows[0];
    console.log(username,password,user)

    if(!user) {
        return res.status(404).json({ success: false, message: 'User not found'})
    }

    bcrypt.compare(password, user.passwd, function(err, result) {
        if(err) throw(err)
        if (result) {
            const token = jwt.sign({ id: user.id, username:user.username,team_id: user.team_id }, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
                if(err) { console.log(err) }
                res.status(200)
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token,
                    username: user.username,
                });
            });
        } else {
            res.status(403).json({ message: 'Failed', data: username });
        }
      });
})

module.exports = router;