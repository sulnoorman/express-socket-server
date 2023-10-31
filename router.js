var express = require('express');

var router = express.Router();

router.get("/", (req, res) => {
    res.status(200);
    res.json({message: 'Welcome to server app'})
})

module.exports = router