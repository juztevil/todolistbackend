const mysql = require('mysql');

const con=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    port:4306,
    database:'todolist'
});

const connectToDB = (mysqlObj) => {
    let response={};
    return new Promise((resolve,reject)=>{
        mysqlObj.connect((err)=>{
            if(err){
                response['connected']=false;
                response['error']=err;
                reject(response);
            }
            else{
                response['connected']=true;
                resolve(response);
            }
        })
    })
};

const query = (mysqlObj,query) => {
    let response={}
    return new Promise((resolve,reject)=>{
        mysqlObj.query(`${query}`,(err,results,fields)=>{
            if(err){
                response['success']=false;
                response['error']=err;
                reject(response);
            }
            else{
                response['success']=true;
                response['result']=results;
                resolve(response);
            }
        })
    })
};

const closeDB = (mysqlObj) => {
    return new Promise((resolve,reject)=>{
        let response={};
        mysqlObj.end((err)=>{
            if(err){
                response['closed']=false;
                response['error']=err;
                reject(response);
            }
            else{
                response['closed']=true;
                resolve(response);
            }
        });
    });
};

module.exports={con, connectToDB, query, closeDB};
