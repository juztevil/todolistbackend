const express = require('express');
const {con,query} = require('../mysql.js');
const {getDate} = require('../getDate.js')
const router = express.Router();

router.post('/addatodo',(req,res)=>{
    let {username,todo} = req.body;
    let queryStatement=`insert into todos values("${username}","${todo}","${getDate('today')}")`;
    query(con,queryStatement).then((response)=>{
        if(response['success'])
        res.json({todoAdded:true});
    }).catch((error)=>{
        if(error['error']['sqlMessage'].startsWith('Cannot add or update a child row'))
        res.json({todoAdded:false,reason:'user not found'});
        else
        res.json({todoAdded:false,reason:error['error']['sqlMessage']});        
    })
});

module.exports=router;