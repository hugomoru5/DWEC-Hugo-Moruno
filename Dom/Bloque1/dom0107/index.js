
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
        
        BTNS_ELIMINAR.forEach((btnElim) => {
        btnElim.addEventListener('click', (row) =>{
                console.log(row.target + " - " + btnElim.pos); 

                var botones = Array.from(BTNS_ELIMINAR);

                var elemento = botones.find((e) => {
                    e.value === btnElim;
                })

                var posicion = botones.indexOf(elemento);

                OBJ_TABLA.deleteRow(posicion);
            })
        })
    })
});
