"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '12/10/2024'
 */

import * as utils from "./utils.mjs";

/**
 * @name = Variables de inicio.
 */

/**
 * Variables de objetos del documento.
 */

export const TURNO = new utils.turno();

const BTN_PANTINFO = $('#pantallaInfoButton');
const BTN_REINICIAR = $('#reiniciarJuego');
const OBJ_PANTINFO = $('#pantallaInfo');
const OBJS_CASILLAS = $('main>#tablero>div');

/**
 * @name = Main.
 */

$(document).ready(() => {

    /**
     * Función de inicio de utils.mjs.
     */
    utils.inicio();

    /**
     * Coge cada casilla y le pone un gestor de eventos. 
     * En cada clickse añade una ficha y se realizan las distintas comprobaciones.
     */
    OBJS_CASILLAS.each(function(){
        $(this).on('click', function() {
            utils.anadirFicha($(this), TURNO.turno()) ? TURNO.anadirTurno() : null ;
        });
    })

    /**
     * El botón reiniciar tiene un gestor de eventos que limpia casillas y contadores.
     */
    BTN_REINICIAR.on('click', () => {
        utils.reiniciar();
        utils.limpiarContadores();
        TURNO.clearTurno();
    });

    /**
     * Este botón es el que cierra la pantalla de información y borra el div que contenga.
     */
    BTN_PANTINFO.on('click', () => {
        OBJ_PANTINFO.removeClass('mostrar');
        OBJ_PANTINFO[0].lastChild.remove();
    });
});

