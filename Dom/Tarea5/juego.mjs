/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '21/10/2024'
 */

import * as utils from './utils.mjs';

/**
 * @name = Variables de inicio.
 */

const BTN_PANTINFO = $('#buttonInfo');
const BTN_PANTINICIO = $('#buttonInicio');
const PANT_INFO = $('#pantallaInfo');

/**
 * @name = Main.
 */

$(document).ready(() => {

    //Inicializa los paneles de información y menú.
    utils.inicio();

    //Cierra y borra el contenido de la pantalla de información.
    BTN_PANTINFO.on('click', function () {
        utils.verInfo(false);
        PANT_INFO.find('div').remove();
    });

    //Comienza el juego.
    BTN_PANTINICIO.on('click', function () {
        utils.comenzar();
    });
});
