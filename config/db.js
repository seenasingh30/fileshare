require('dotenv').config();
const mongoose = require('mongoose');




function connectDB(){
mongoose.connect(process.env.MONGO_URL,{ useUnifiedTopology: true,
    useNewUrlParser: true});
const connection = mongoose.connection;

  connection.once('open', function () {
      console.log('connection established');
      
    })

    .on('error', function (err) {
      console.log(err);
    });



}
module.exports=connectDB;
