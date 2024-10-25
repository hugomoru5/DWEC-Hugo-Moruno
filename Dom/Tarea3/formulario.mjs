"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '09/10/2024'
 */

import * as validaciones from "./formulario-validaciones.mjs";

/**
 * @name = Variables de inicio.
 */

/**
 * Variables de objetos del documento.
 */
const BTN_LIMPIAR = $('#limpiar');
const FORM = $('#formulario');
const OBJ_CAMPOSFORM = $('input');
const OBJ_BTNRESUL = $('#submitResultButton');

/**
 * @name = Main.
 */

/**
 * Evento que carga al terminar de cargarse el documento.
 */
$(document).ready(() => {
    
    /**
     * Llamada al método de limpieza.
     */
    BTN_LIMPIAR.on('click', validaciones.limpiarFormulario);

    /**
     * Gestor de eventos del formulario.
     * Focus: Enseña el campo de información pertinente.
     * Blur: Borra el campo de información pertinente.
     * Input: Comprueba en tiempo real que los campos sean correctos.
     */
    OBJ_CAMPOSFORM.each(function() {
        $(this).on('focus', (event) => {
            validaciones.infoCampos(event.target, true);
        });    

        $(this).on('blur', (event) => {
            validaciones.infoCampos(event.target, false);
        });

        $(this).on('input', (event) => {
            validaciones.validarCampo(event.target);
        });
    });
    
    /**
     * Gestor del evento submit.
     */
    FORM.on('submit', (event) => {
        // Si hay errores no envía el formulario y muestra la pantalla de errores.
        if (validaciones.errores.length > 0) 
        {
            event.preventDefault();
            validaciones.errorAlEnviar();
        } 
        else 
        {
            // Valida todos los campos y si hay errores actúa.
            OBJ_CAMPOSFORM.each(function() {
                validaciones.validarCampo(this);
            });
            if (validaciones.errores.length > 0) 
            {
                event.preventDefault();
                validaciones.errorAlEnviar();
            } 
            else 
            {
                validaciones.enviadoCorrectamente();
                validaciones.limpiarFormulario();
            }
        }
    });

    /**
     * Gestor del evento para ocultar la pantalla de información post-submit.
     */
    OBJ_BTNRESUL.on('click', () => {
        validaciones.ocultarResultado();
    });
});