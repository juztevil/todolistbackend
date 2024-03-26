const express = require('express');
const {con,query} = require('../mysql.js');
const router=express.Router();

router.post('/adduser',(req,res)=>{
    let {username,password}=req.body;
    let queryStatement=`insert into users values("${username}","${password}")`;
    query(con,queryStatement).then((response)=>{
        if(response['success'])
        res.json({accountAdded:true});
    })
    .catch((error)=>{
        if(error['error']['sqlMessage'].startsWith('Duplicate entry'))
        res.json({accountAdded:false,reason:'user already exists'});
        else
        res.json({accountAdded:false});
    })
});

module.exports=router;
