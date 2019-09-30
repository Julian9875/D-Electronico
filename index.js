
//const port = 9000;


//app.get('/', (request, response) => {
  //  console.log(`URL: ${request.url}`);
    //response.send('Hello, Server!');
//});
// Inicia el server
//const server = app.listen(port, (error) => {
    //if (error) return console.log(`Error: ${error}`);

    //console.log(`Server listening on port ${server.address().port}`);
//});
const express = require('express');
const app = express();
var hbs = require('express-hbs');
const path = require('path')

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/public'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/public');

app.use(express.static(path.join(__dirname,'public')))   // static files

app.set('port',process.env.PORT || 9000);

app.listen(app.get('port'), () => {
    console.log('server on port',app.get('port'))
});

app.get('/',(req,res)=>{
  res.render('index',{
  })
})

// Acceso a base de datos

var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "db4free.net",
    user: "baenav",
    password: "qwertyuiop",
    database: "proyecto_diseno"});

const quer1 = "SELECT P1, P2, P3, P4, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos ORDER BY fecha DESC, hora DESC LIMIT 100";
const querD = "SELECT P1, P2, P3, P4, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos ORDER BY fecha DESC, hora DESC LIMIT 288";
const querS = "SELECT P1, P2, P3, P4, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos ORDER BY fecha DESC, hora DESC LIMIT 2016";


con.connect(function(err) {if (err) throw err;});

app.get('/Generar',function(req,res){
  console.log('Generando')
  
    
    con.query( quer1 , function (err, result, fields) {
      if (err) throw err;
     // console.log(result);
      //console.log(JSON.stringify(result))
      res.send(JSON.stringify(result));
      
      });
      //con.end(); 
  
})

app.get('/GenerarDay',function(req,res){
  console.log('Generando')
  
    
    con.query( querD , function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      //console.log(JSON.stringify(result))
      res.send(JSON.stringify(result));
      
      });
      //con.end(); 
  
})

app.get('/GenerarWeek',function(req,res){
  console.log('Generando')
  
    
    con.query( querS , function (err, result, fields) {
      if (err) throw err;
      //console.log(result);
      //console.log(JSON.stringify(result))
      res.send(JSON.stringify(result));
      
      });
      //con.end(); 
  
})


