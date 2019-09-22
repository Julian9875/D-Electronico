var mysql = require('mysql'); //Paquete necesario para conectar a la BD
var conexion= mysql.createConnection({
    host : 'localhost',
    database : 'datos',
    user : 'root',
    password : '',
});

conexion.connect(function(err) {
    if (err) {
        console.error('Error de conexion: ' + err.stack);
        return;
    }
    console.log('Conectado con el identificador ' + conexion.threadId);
});

var queryString ='SELECT P1, P2, P3, P4, UNIX_TIMESTAMP(CONCAT_WS(" ", fecha, hora)) AS datetime FROM datos ORDER BY fecha DESC, hora DESC LIMIT 1200';

conexion.query(queryString, function (error, results, fields) {
    if (error)
        throw error;

    results.forEach(result => {
        console.log(result);
        
        
        
        
        //HASTA AQUI ESTÁ BIEN
        $rows = array();
        $table = array();

        $table['cols'] = array(
            array(
                'label' => 'Date Time',
                'type' => 'datetime'
 ),
            array(
                'label' => 'Potencia 1',
                'type' => 'number'
 ),
            array(
                'label' => 'Potencia 2',
                'type' => 'number'
 ),
            array(
                'label' => 'Potencia 3',
                'type' => 'number'
 ),
            array(
                'label' => 'Potencia 4 ',
                'type' => 'number'
 
    
        
    });
});
connection.end();