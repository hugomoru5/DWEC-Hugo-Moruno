
"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '08/10/2024'
 */

/**
 * @name = Variables de inicio.
 */

const BTN_INSERT = $('#insert');
const OBJ_FRUTA = $('#fruta');
const OBJ_COLOR = $('#color');
const OBJ_TABLA = $('#texto');

/**
 * @name = Main.
 */

$(window).on('load', function() {
    BTN_INSERT.on('click', function() {
        const nuevaFila = $('<tr></tr>'); 
        nuevaFila.append($('<td></td>').text(OBJ_FRUTA.val())); 
        nuevaFila.append($('<td></td>').text(OBJ_COLOR.val())); 
        OBJ_TABLA.append(nuevaFila);
    })
});
