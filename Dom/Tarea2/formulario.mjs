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
const BTN_LIMPIAR = document.getElementById('limpiar');
const FORM = document.getElementById('formulario');
const OBJ_CAMPOSFORM = document.getElementsByTagName('input');
const OBJ_BTNRESUL = document.getElementById('submitResultButton');

/**
 * @name = Main.
 */

/**
 * Evento que carga al terminar de cargarse el documento.
 */
window.addEventListener('load', () => {
    
    /**
     * Llamada al metodo de limpieza.
     */

    BTN_LIMPIAR.addEventListener('click', validaciones.limpiarFormulario);

    /**
     * Gestor de eventos del formulario.
     * Focus: Enseña el campo de información pertinente.
     * Blur: Borra el campo de información pertinente.
     * Input: Comprueba en tiempo real que los campos sean correctos.
     */

    Array.from(OBJ_CAMPOSFORM).forEach((campoForm) => {
        campoForm.addEventListener('focus', (campo) => {
            validaciones.infoCampos(campo.target, true);
        });    

        campoForm.addEventListener('blur', (campo) => {
            validaciones.infoCampos(campo.target, false);
        });

        campoForm.addEventListener('input', (campo) => {
            validaciones.validarCampo(campo.target);
        });
    });
    
    /**
     * Gestor del evento submit.
     */

    FORM.addEventListener('submit', (form) => {

        //Si hay errores no envía el formulario y muestra la pantalla de errores.
        if (validaciones.errores.length > 0)
        {
            form.preventDefault();
            validaciones.errorAlEnviar();
        }
        else
        {
            //Si no hay errores, pero algún campo no cumple los requisitos 
            //(Funciones como autocompletar de los navegadores)
            //valida todos los campos y según si hay errores o no actúa.
            Array.from(OBJ_CAMPOSFORM).forEach((campoForm) => {
                validaciones.validarCampo(campoForm);
            });
            if (validaciones.errores.length > 0)
            {
                form.preventDefault();
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
    OBJ_BTNRESUL.addEventListener('click', () => {
        validaciones.ocultarResultado()
    });

});

