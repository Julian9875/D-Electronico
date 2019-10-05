// Servidor
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
  res.render('index3',{
  })
})

// Acceso a base de datos
var mysql = require('mysql');
var fs = require('fs');

var con = mysql.createConnection({
    host: "db4free.net",
    user: "baenav",
    password: "qwertyuiop",
    database: "proyecto_diseno"

    /*
    host: "diseno1.cl8ozxx0esmz.us-east-1.rds.amazonaws.com",
    user: "anamacn",
    password: "qwertyuiop",
    database: "diseno_1"
    */
  });



const quer1 = "SELECT P1, P2, P3, P4, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos "+
"WHERE CONCAT_WS(' ', fecha, hora) > date_sub(NOW(), INTERVAL 7 HOUR)";

const querD = "SELECT P1, P2, P3, P4, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos "+
"WHERE CONCAT_WS(' ', fecha, hora) > date_sub(NOW(), INTERVAL 1 DAY)";

const querS = "SELECT P1, P2, P3, P4, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos "+
"WHERE CONCAT_WS(' ', fecha, hora) > date_sub(NOW(), INTERVAL 1 WEEK)";



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

app.get('/GenerarCal',function(req,res){
  console.log('Generando')
  console.log(req._parsedUrl.query)

  var Fechas= req._parsedUrl.query.split(",")
  console.log(Fechas)


  const querC = "SELECT P1, P2, P3, P4, CONCAT_WS(' ', fecha, hora) AS datetime FROM datos WHERE fecha BETWEEN '" +Fechas[0] +"' AND '" +Fechas[1]+"' ORDER BY fecha ASC, hora ASC";

    con.query( querC , function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      //console.log(JSON.stringify(result))
      res.send(JSON.stringify(result));

      });
      //con.end();

})
