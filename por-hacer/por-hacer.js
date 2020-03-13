const fs = require('fs')

let listadoPorHacer = []

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json',data, (err) => {
        if(err) console.error('Se produjo un error al escribir archivo', err)

        console.log('Datos guardados correctamente')
    });
}

//Leemos el fichero data.json. Si por algun casual el fichero estuviera vacio, le metemos un array vacío en el que insertaremos despues el objeto
const cargarDB = () => {

    try {
        listadoPorHacer = require('../db/data.json');    
    } catch (error) {
        listadoPorHacer = [];
    }
}


const crear = (descripcion) => {

    cargarDB()

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer)

    guardarDB()

    return porHacer;
}

// Obtenemos el listado completo de tareas para luego mostrarlo al ejecutar el comando listar
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true) => {

    cargarDB();

    // Buscamos el elemento de la lista en el que coincida la descripcion del objeto con la que llega por parametro.
    // Si devuelve -1, no se habría encontrado la descripcion
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion)

    if( index >= 0) {
        // Cambiamos el valor del completado en esa posicion por la que viene por parametro y guardamos en el fichero
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {

    cargarDB();
    
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion != descripcion);

    if(listadoPorHacer.length === nuevoListado.length) {
        return false;
    } else {
        listadoPorHacer = nuevoListado;
        guardarDB();
        return true;
    }

    /* MI FORMA DE HACERLO
    let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion)

    if( index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        return false;
    }
    */
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}