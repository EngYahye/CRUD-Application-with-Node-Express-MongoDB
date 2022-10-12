const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
const bodayParser=require('body-parser');
const path=require('path');

const app=express();
dotenv.config({path:'config.env'})

app.use(morgan('tiny'))

app.use(bodayParser.urlencoded({extended:true}))

app.set('view engine','ejs');

app.use('/img', express.static(path.resolve(__dirname,'asssets/img')));

app.use('/js', express.static(path.resolve(__dirname,'asssets/js')));

app.use('/css', express.static(path.resolve(__dirname,'asssets/css')));

const PORT=process.env.PORT || 8080;

app.get('/',(req,res)=>{
 res.render('index')
})

app.listen(PORT,()=>{console.log(`server is running http://localhost:${PORT}`)})