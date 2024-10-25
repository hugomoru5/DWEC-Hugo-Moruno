
"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '08/10/2024'
 */

/**
 * @name = Variables de inicio.
 */

const BTN_INSERT = document.getElementById('insert');
const OBJ_FRUTA = document.getElementById('fruta');
const OBJ_COLOR = document.getElementById('color');
const OBJ_TABLA = document.getElementById('texto');
const BTNS_ELIMINAR = document.getElementsByName('eliminarRow');

/**
 * @name = Main.
 */

window.addEventListener('load', (e) => {
    BTN_INSERT.addEventListener('click' , (tab) => {
        var row = OBJ_TABLA.insertRow();
        row.insertCell(0).innerHTML = OBJ_FRUTA.value;
        row.insertCell(1).innerHTML = OBJ_COLOR.value;
        row.insertCell(2).innerHTML = 
        "<button type='button' name='eliminarRow' id='eliminarRow'>Eliminar</button>";
        botonesEliminar();
    });

    BTNS_ELIMINAR.forEach((btnElim) => {
        btnElim.addEventListener('click', () =>{
            OBJ_TABLA.deleteRow(btnElim.parentNode.parentNode.rowIndex);
        });
    });
        
});

function botonesEliminar()
{
    var BTNS_ACTUALIZADOS = document.getElementsByName('eliminarRow');
    
    BTNS_ACTUALIZADOS[BTNS_ACTUALIZADOS.length-1].addEventListener('click', (btnElim) =>{
        OBJ_TABLA.deleteRow(btnElim.target.parentNode.parentNode.rowIndex);
    });
};