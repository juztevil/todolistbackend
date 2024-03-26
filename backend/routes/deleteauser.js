const express = require('express');
const {con,query} = require('../mysql.js');
const router = express.Router();

router.delete('/deleteauser',(req,res)=>{
    let {username,password} = req.body;
    let queryStatement=`select * from users where username="${username}"`;
    query(con,queryStatement).then((response)=>{
        if(response['result'].length===0)
        res.json({username:'not found'});
        else{
            if(response['result'][0]['password']!==password)
            res.json({accountDeleted:false,reason:'password is wrong'});
            else{
                let queryStatement=`delete from todos where username="${username}"`;
                query(con,queryStatement).then((response)=>{
                    if(response['success']){
                        let queryStatement=`delete from users where username="${username}"`;
                        query(con,queryStatement).then((response)=>{
                            if(response['success'])
                            res.json({accountDeleted:true});
                        }).catch((error)=>{
                            console.log(error);
                        });
                    }
                }).catch((error)=>{
                    console.log(error);
                })
            }
        }
    }).catch((error)=>{
        console.log(error);
    });
});

module.exports=router;

