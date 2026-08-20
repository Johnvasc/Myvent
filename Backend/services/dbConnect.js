async function dbConnect(){
    try{
        const database = require('./dbServices.js');
        await database.sync();
    }catch(err){
        console.error('Unable to connect to the database:', err);
    }
}

module.exports = dbConnect;