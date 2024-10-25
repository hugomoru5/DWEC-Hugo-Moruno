
"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '08/10/2024'
 */

/**
 * @name = Variables de inicio.
 */

const BTN_INSERT = $('#btnAdd');
const OBJ_INPUTTEXT = $('#texto');
const OBJ_PARRAFO = $('#parrafo');

/**
 * @name = Main.
 */

$(window).on('load', function() {
    BTN_INSERT.on('click' , function() {
        OBJ_PARRAFO.append('\n'+OBJ_INPUTTEXT.val());
        OBJ_INPUTTEXT.val("");
    });
});