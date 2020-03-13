const descripcion = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripcion de la tarea por hacer'
    }
}

const completado = {
    completado: {
        demand: true,
        alias: 'c',
        desc: 'Marca como completado la tarea pendiente'
    }
}

const argv = require('yargs')

.command('crear','Crea una nueva tarea',{
    descripcion
})
.command('actualizar', 'Actualiza el estado completo de una tarea', {
    descripcion,
    completado
})
.command('borrar', 'Elimina una tarea', {
    descripcion
})
.help().argv

module.exports = {
    argv
}


