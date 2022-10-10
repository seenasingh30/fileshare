const express = require('express');
const app = express();
const path = require('path');
var expressLayouts = require('express-ejs-layouts');
// const connectDB= require('./config/db');
// connectDB();


const PORT = process.env.PORT || 3000;
// app.use(express.static(__dirname + '/public'));
const connectDB= require('./config/db');
connectDB();

// app.set('views',path.join(__dirname,'/views'));
// app.set('view engine','ejs');
app.use(expressLayouts)
app.set('view engine','ejs');
//routes
app.use('/api/files',require('./routes/files'));
app.use('/files',require('./routes/show'));
app.use('/files/download',require('./routes/download'));


// app.get('/',)

// app.get('/login', function(req, res) {
//     console.log("hello");
//     res.sendFile('./public/login');
//  })



app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}/`);
  });
