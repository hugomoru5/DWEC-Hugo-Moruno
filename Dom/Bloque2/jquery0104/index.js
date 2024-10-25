"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '08/10/2024'
 */

/**
 * @name = Variables de inicio.
 */

const OBJ_TEXTO = $('#texto');
const OBJ_SELECTOR = $('#fuente');
const OBJ_TAMANHO = $('#tamanho');

/**
 * @name = Main.
 */

$(window).on('load', function() {
    OBJ_SELECTOR.on('change', function(){
        OBJ_TEXTO.css('font-family', $(this).val());
    })

    OBJ_TAMANHO.on('change', function() {
        OBJ_TEXTO.css('font-size', $(this).val()+"px");
    });
});
