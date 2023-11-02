const express = require('express');
const app  = express();

const mongoose = require('mongoose');
require('dotenv').config();  //variable de ambiente
const usersRoutes = require('./routes/user');

const port = process.env.PORT || 3000;
app.listen(port,()=>
    console.log(`servidor corriendo en el puerto ${port}`)
    );

//Creando la ruta ppal de la API  servicio WEB{logica == CRUD}
app.get('/',
    (req,res)=>{
        res.send('Bienvenido a mi API, esta es la ruta Ppal');
    });

//vamos a agregar otro modulo, este para
// conectar la api con mongodb
// npmm i mongoose
// npm i mongo

//conectandose a la Bd MongoDB
// ---Instalamos elpqte para las variables de ambiente
// npm i dotenv
// Traemos la Cadena de conexion de connect en el MongoDB
// creamos el archivo .env
// Alli agregamos una CONSTANTE y le asignamos la cadenaConexion
// Luego la invocamos aqui en el metodo connect del objeto moongose
// Este se solicito y creo como const en la linea 4

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=> console.log('Conectado a la BdD en MongoDB Atlas (WEB)'))
    .catch((error)=>console.error(`Se produjo el error ${error}`));

//CREAREMOS LOS ENDPONINTS O SERVICIOS WEB 
// ESTOS VAN EN UN ARCHIVO APARTE routes
//// Y CREAMOS UN ARCHIVO PARA CADA RECURSO A USAR (EJ.. user.js)
// // //// CREAREMOS ALLI TODAS LAS RUTAS PARA LOS USUARIOS Y POR AHORA 
// CREAMOS LA RUTA VACIA PARA AGREGAR UN USUARIO A LA BdD

//AHORA LLAMAMOS LAS RUTAS DE LA CARPETA route/user.js
//middleware
//-------todas las rutas debeb tener el prefijo /api
app.use(express.json());
app.use('/api',usersRoutes);

//PARA PROBAR AGREGAMOS O POSTMAN O UNA EXTENSION LLAMADA react client

//AHORA VAMOS A CREAR LOS MODELOS
// CREAMOS LA CARPETA MODELS EN SRC, Y AGREGAMOS EL ARCHIVO userModel.js
// DONDE INVOCAMOS A MONGOOSE Y CREAMOS UN SCHEMA CON LOS DATOS A REGISTRAR

//AHORA DEBEMOS USARLO
//IMPORTAMOS EL SCHEMA EN LA LINEA 2 DE user.js
// CAMBIAMOS EL MODO DE RESPUESTA DE LA RUTA POR DFECTO vea el archivo
// YA CONFIGURAMOS LA RESPUESTA Y EN LA RUTA, Y AHORA VAMOS A PROBAR
// ENTONCES :
// CAMBIAMOS EL request.http,  CON LOS DATOS CON LOS QUE VAMOS A PROBAR -- vea el archivo
// PERO EL SERVIDOR NO VA A ENTENDER LO QUE LE ESTAMOS ENVIANDO, 
// ENTONCES 
// AGREGAMOS UN NUEVO MIDDLEWARE PARAQUE HAGA LA TRANSFOMACION Y ENVI EN EL FORMATO JS --LINEA No 45
