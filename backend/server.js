const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require("./config/database")

// handling unhandled rejects
process.on('unhandledRejection',(err) =>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server duw to uncaught rejection");

    server.close(()=>{
        process.exit(1);
    }); 
});


dotenv.config({path:'backend/config/config.env'})
// connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
}) 

// unhandled promise rejection
process.on('unhandledRejection',(err) =>{
    console.log(`Error:${err.message}`);
    console.log("Shutting down the server duw to unhandled promise rejection");

    server.close(()=>{
        process.exit(1);
    }); 
});