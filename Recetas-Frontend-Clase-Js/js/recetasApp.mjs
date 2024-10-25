/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = ''
 */

/**
 * @name = Variables de inicio.
 */

import * as http from './lib/http.mjs';

const TABLA_RECETAS = $('#contenidoRecetas');
const BTN_CARGAR = $('#cargarRecetas');

/**
 * @name = Main.
 */

$("#recetas").load(()=>{

    BTN_CARGAR.on('click', function(){
        cargarRecetas();
    })

});


function cargarRecetas()
{
    http.get('http://localhost:3000/recetas', onRecetasCargadas);
}
function onRecetasCargadas(recetas)
{
    renderizarRecetas(recetas);
}
function renderizarRecetas(recetas)
{
    recetas.forEach(receta => {
        var fila = $('<tr></tr>')
        .append($('<th></th>').text(receta.id))
        .append($('<td></td>').text(receta.nombre))
        .append($('<td></td>').text(receta.descripcion))
        .append($('<td></td>').text(receta.fechaAlta))
        .append($('<td></td>').text(receta.tiempo))
        .append($('<td></td>').text(receta.dificultad))
        .append($('<td></td>').text(receta.puntuacion));
        TABLA_RECETAS.append(fila);
    });
}