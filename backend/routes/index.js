const express = require('express');
const router = express.Router();

router.get(`/`,(req,res)=>{
    res.send(`Welcome to ToDo List. This server is built in express`);
});

module.exports=router;
