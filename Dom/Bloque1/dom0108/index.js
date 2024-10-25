
"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '08/10/2024'
 */

/**
 * @name = Variables de inicio.
 */

const BTN_INSERT = document.getElementById('btnAdd');
const OBJ_INPUTTEXT = document.getElementById('texto');
const OBJ_PARRAFO = document.getElementById('parrafo');

/**
 * @name = Main.
 */

window.addEventListener('load', (e) => {
   
    BTN_INSERT.addEventListener('click', () => {
        var textAnterior = OBJ_PARRAFO.value;
        OBJ_PARRAFO.innerText = textAnterior+ OBJ_INPUTTEXT.value;
        OBJ_INPUTTEXT.value = "";
    });

});