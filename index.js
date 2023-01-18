// express nos servirá para levantar nuestro servidor para las rutas
const express = require("express"); 

//las cors sirven para permitir o denefar que se pueda acceder al servidor desde x sitios
const cors = require("cors"); 

const passport = require("passport");

const auth = require('./src/utils/auth/index');

auth.activarAtenticacion();

//importar db
const db = require('./src/utils/db');

//utilizamos la función que me conecta con la base de datos de nuestro archivo db
db.connectDB();

//all routes imports -> para luego poder utilizarlas en nuestro servidor
const usersRoutes = require('./src/api/users/user.routes');
const teachersRoutes = require("./src/api/teachers/teacher.routes");
const courseBlocksRoutes = require('./src/api/courseBlocks/courseBlock.routes');
const indexRoutes = require("./src/api/index/index.routes");

//declaramos el puerto en el que se levantará nuestro servidor
const PORT = 3000;

//ejecutamos nuestro express() para tener acceso al server y poder hacer ciertas cosas sobre el
const server = express();

//para que admita peticiones desde otro servidor, front o app -> las cors al estar vacia indicara que todo el
//mundo puede acceder a nuestro servidor
server.use(cors());

//transformar el contenido o curpo de las peticiones POST (req.body)
//convierte cuando enviamos un post con json al servidor
server.use(express.json());
//convierte cuando mandamos un form o formData al servidor
server.use(express.urlencoded({extended: true }));

//Autenticación!
server.use(passaport.initialize());

//Configuración de todas las rutas de nuestro servidor
server.use("/teachers", teachersRoutes);
server.use("/", indexRoutes);

//las rutas las crearemos con guiones medios, a diferencia del modelo que será en base de datos course_blocks. Ruta:course-blocks.
server.use("/course-blocks", courseBlocksRoutes);
server.use("/", indexRoutes);


//por aquí pasaran todas las rutas que no existan
//si no hacen match en las rutas previas, llegarán aquí y harán match con asterisco (todo entra!)
server.use("*", (req, res, next) => {
    return res.status(404).json("No se encuentra la URL. Prueba con otra URL");
});

//controlador de errores.
server.use((error, req, res, next) => {
    const status = error.status || 500;
    const message = error.message || "unexpected Error!";
    return res.status(status).json(message);
});




server.listen(PORT, () => {
    console.log(`https://localhost:'${PORT}`)
});

/**
 * - .gitignore
 * - package.json
 * - index.js
 * - /src
 *      - /api
 *          - /teachers (aquí crearemos un CRUD para profesores, ej: Santi, Juan, Roberto etc..)
 *              teacher.model.js
 *              teacher.routes.js
 *              teacher.controller.js
 *          - /users (los usuarios de nuestra web seréis vosotros mismos, accederéis a la APP.)
 *              user.model.js
 *              user.routes.js
 *              user.controller.js
 *          - /course-block (JS, Node, React, etc...)
 *              courseBlock.mode.js
 *              courseBlock.routes.js
 *              courseBlock.controller.js
 *          - /course-sessions (Dia 20/enero una clase de (bloque clases) con el profesor (teacher))
 * 
 * 
 * 
 * 
 *      
 * 
 * 
 */