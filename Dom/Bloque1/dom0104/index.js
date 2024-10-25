
"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '08/10/2024'
 */

/**
 * @name = Variables de inicio.
 */

const OBJ_TEXTO = document.getElementById('texto');
const OBJ_SELECTOR = document.getElementById('fuente');
const OBJ_TAMANHO =document.getElementById('tamanho');

/**
 * @name = Main.
 */

window.addEventListener('load', (e) => {
    OBJ_SELECTOR.addEventListener('change', (opt) =>{
        OBJ_TEXTO.style.fontFamily = opt.target.value;
    })

    OBJ_TAMANHO.addEventListener('change', (tam) =>{
        OBJ_TEXTO.style.fontSize = tam.target.value+"px";
    });

});
