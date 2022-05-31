const express = require('express')
const router = express.Router()
const User = require('./User')

router.get('/user',(req, res)=>{
    res.send('Boa tarde')
})

router.get('/users',(req, res)=>{
    res.render('Users/user')
})


module.exports = router