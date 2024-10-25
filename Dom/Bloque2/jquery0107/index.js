
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
const BTNS_ELIMINAR = $('button[name="eliminarRow"]');

/**
 * @name = Main.
 */

$(window).on('load', function() {
    BTN_INSERT.on('click' , function() {
        OBJ_TABLA.append(`<tr>
                            <td>${OBJ_FRUTA.val()}</td>
                            <td>${OBJ_COLOR.val()}</td>
                            <td><button type='button' name='eliminarRow' id='eliminarRow'>Eliminar</button></td>
                        </tr>`);
        botonesEliminar();
    });

    BTNS_ELIMINAR.each(function() {
        $(this).on('click', function() {
            $(this).closest('tr').remove();
        });
    });
        
});

function botonesEliminar()
{
    $('button[name="eliminarRow"]').last().on('click', function() {
        $(this).closest('tr').remove();
    });
};