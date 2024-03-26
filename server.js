const express = require('express');
const {con,connectToDB,closeDB} = require('./backend/mysql.js');
const indexRouter=require('./backend/routes/index.js');
const addauserrouter = require('./backend/routes/addauser.js');
const addatodorouter = require('./backend/routes/addatodo.js');
const displaytodosrouter = require('./backend/routes/displaytodos.js');
const deleteauserrouter = require('./backend/routes/deleteauser.js');
const PORT = process.env.port || 4455;

const app=express();

app.use(express.json());

app.listen(PORT,()=>{
    console.log(`Welcome to ToDo List Backend.\nServer Listening in http://localhost:${PORT}`);
    connectToDB(con).then((response)=>{
        if(response['connected'])
        console.log('MySql Connected Successfully')
    })
    .catch((error)=>{
        console.log("Error connecting to MySql "+error);
    });
});

app.use('',indexRouter);
app.use('',addauserrouter);
app.use('',addatodorouter);
app.use('',displaytodosrouter);
app.use('',deleteauserrouter);

process.on('SIGINT',()=>{
    console.log('Server shutting down');
    closeDB(con).then((response)=>{
        if(response['closed']){
            console.log('MySql connection closed successfully');
            process.exit(0);
        }
    }).catch((error)=>{
        console.log('Error while closing MySql connection '+error)
    });
});
