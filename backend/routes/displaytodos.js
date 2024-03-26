const express = require('express');
const {con,query} = require('../mysql.js');
const {getDate} = require('../getDate.js');
const router=express.Router();

router.get('/:username/displaytodos',(req,res)=>{
    let username=req.params.username;
    let queryStatement=`select username from users where username="${username}"`;
    query(con,queryStatement).then((response)=>{
        if(response['result'].length===0)
        res.json({username:'not found'});
        else{
            let queryStatement=`select todo from todos where username="${username}" and date="${getDate('today')}"`;
            query(con,queryStatement).then((response)=>{
                let resObj={};
                resObj['username']=username;
                let today=[];
                for(let i=0;i<response['result'].length;++i)
                today.push(response['result'][i]['todo']);
                resObj['today']=today;

                let queryStatement=`select todo from todos where username="${username}" and date="${getDate('yesterday')}"`;
                query(con,queryStatement).then((response)=>{
                    let yesterday=[];
                    for(let i=0;i<response['result'].length;++i)
                    yesterday.push(response['result'][i]['todo']);
                    resObj['yesterday']=yesterday;

                    res.json(resObj);
                }).catch((error)=>{
                    console.log(error);
                });
            }).catch((error)=>{
                console.log(error);
            });
        }
    }).catch((error)=>{
        console.log(error);
    });
});

router.get('/:username/displaytodos/:day',(req,res)=>{
    let username=req.params.username;
    switch(req.params.day){
        case 'today':
            let queryStatement=`select username from users where username="${username}"`;
            query(con,queryStatement).then((response)=>{
                if(response['result'].length===0)
                res.json({username:'not found'});
                else{
                    let queryStatementfortoday=`select todo from todos where username="${username}" and date="${getDate('today')}"`;
                    query(con,queryStatementfortoday).then((response)=>{
                        let resObj={};
                        resObj['username']=username;
                        let today=[];
                        for(let i=0;i<response['result'].length;++i)
                        today.push(response['result'][i]['todo']);
                        resObj['today']=today;
                        res.json(resObj);
                    }).catch((error)=>{
                        console.log(error);
                    });
                }
            }).catch((error)=>{
                console.log(error);
            });
        break;
        case 'yesterday':
            let queryStatementforyesterday=`select username from users where username="${username}"`;
            query(con,queryStatementforyesterday).then((response)=>{
                if(response['result'].length===0)
                res.json({username:'not found'});
                else{
                    let queryStatementforyesterday=`select todo from todos where username="${username}" and date="${getDate('yesterday')}"`;
                    query(con,queryStatementforyesterday).then((response)=>{
                        let resObj={};
                        resObj['username']=username;
                        let yesterday=[];
                        for(let i=0;i<response['result'].length;++i)
                        yesterday.push(response['result'][i]['todo']);
                        resObj['yesterday']=yesterday;
                        res.json(resObj);
                    }).catch((error)=>{
                        console.log(error);
                    });
                }
            }).catch((error)=>{
                console.log(error);
            });
        break;
        default:
    }
});

module.exports = router;
