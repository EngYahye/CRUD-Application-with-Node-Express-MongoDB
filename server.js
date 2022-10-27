const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodayParser = require('body-parser');
const path = require('path');
const connectDB = require('./server/database/connection');

const app = express();
dotenv.config({ path: 'config.env' });

app.use(morgan('tiny'));

app.use(bodayParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));

app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));

const PORT = process.env.PORT || 8080;

connectDB();
app.use('/', require('./server/routes/router'));

app.listen(3000);

console.log('server is running 3000');

// app.listen(PORT,()=>{console.log(`server is running http://localhost:${PORT}`)})
