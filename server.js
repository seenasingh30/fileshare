const express = require('express');
const app = express();
const path = require('path');
var expressLayouts = require('express-ejs-layouts');
// const connectDB= require('./config/db');
// connectDB();


const PORT = process.env.PORT || 3000;
app.use(express.static(__dirname + '/public'));
app.use(express.json());
const connectDB= require('./config/db');
connectDB();

// app.set('views',path.join(__dirname,'/views'));
// app.set('view engine','ejs');
// app.use(expressLayouts)
app.set('view engine','ejs');
//routes
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));


console.log(__dirname);

app.get('/', function(req, res) {
    console.log("hello");
    res.sendFile(__dirname + '/public/login.html');
 })



app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
  });
