/*
 * Created by Jimmy Rodriguez on 05/01/2016.
 */

var mongoose = require('mongoose');


//se crea una instancia de base de datos donde se incluye la informacion atributo-valor
var TareasSchema = new mongoose.Schema({
    nombre: String,
    prioridad: Number

});
// se creara el modelo de datos, los dos parametros que se incluyen uno es principalmente el nombre del modelo, hasta ahi se
//define el nombre, el segundo parametro es esquema de la base de datos que se creo.
mongoose.model('Tareas',TareasSchema);
