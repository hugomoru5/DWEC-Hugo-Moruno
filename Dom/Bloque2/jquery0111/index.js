
"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '09/10/2024'
 */

/**
 * @name = Variables de inicio.
 */

const NUM = $('input[name="numero"]'); 
const NAME = $('input[name="nombre"]'); 

var num_find = false;
var name_find = false;
/**
 * @name = Main.
 */

$(window).on('load', function() {
    NUM.on('blur', onNumBlur);
    NAME.on('blur', onNameBlur);
    $('#enviar').on('click', onEnviarClick);
})

/**
 * @name = Gestores de eventos.
 */

function onNumBlur(e){
    if (!Number(NUM.val()))
    {
        NUM.css('background-color', 'lightcoral')
        num_find = false;
    }
    else
    {
        NUM.css('background-color', 'lightgreen')
        num_find = true;
    }
}

function onNameBlur(e){
    if(NAME.val().trim() == '')
    {
        NAME.css('background-color', 'lightcoral')
        name_find = false;
    }
    else
    {
        NAME.css('background-color', 'lightgreen')
        name_find = true;
    }
}

function onEnviarClick(e){
    if(name_find && num_find)
    {
        //haz un submit o algo coño
    }
    else
    {
        alert('Rellena los campos.');
    }
}