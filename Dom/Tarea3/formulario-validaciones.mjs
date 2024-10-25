"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '09/10/2024'
 */

/**
 * Componentes del archivo actual que se exportan.
 * 
 * errores = array que contabiliza los errores globales.
 */
export 
{ 
    errores,
    limpiarFormulario,
    infoCampos,
    validarCampo,
    errorAlEnviar,
    ocultarResultado,
    enviadoCorrectamente
};

/**
 * @name = Variables de inicio.
 */

/**
 * Variables de los inputs del formulario
 */
const OBJ_NOMBRE = $('#Nombre');
const OBJ_APELLIDOS = $('#Apellidos');
const OBJ_DNI = $('#Dni');
const OBJ_EMAIL = $('#Email');
const OBJ_PASSWD = $('#Passwd');
const OBJ_PASSWDREP = $('#Passwdrep');

/**
 * Variables que contienen elementos del dom que realizan acciones.
 */
const OBJ_INFOSFORM = $('.info');
const OBJ_CABECERO = $('#cabecero');
const OBJ_RESULTADO = $('#submitResult');

let errores = [];

/**
 * Array clave / valor con los validadores del formulario.
 */

var validadores = 
{
    'noVacio': /^.+$/,
    'noNum': /^[a-zA-ZÁ-ÿá-ÿ]+$/,
    'dni': /^\d{8}[A-Z]$/,
    'email': /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/,
    'de3a20': /^.{3,20}$/,
    'de3a40': /^.{3,40}$/,
    'de8a20': /^.{8,20}$/
};

/**
 * Array clave / valor con los contenidos de los mensajes de error.
 */

var msjError = 
{
    'noVacio': "Por favor, rellene todos los campos.",
    'noNum': "Nombre y Apellidos no admiten números.",
    'dni': "Este DNI no tiene formato válido",
    'email': "El correo electrónico no es válido",
    'de3a20': "Nombre: longitud permitida de 3 a 20 caracteres.",
    'de3a40': "Apellidos: longitud permitida de 3 a 40 caracteres.",
    'de8a20': "Contraseña: longitud permitida de 8 a 20 caracteres.",
    'passRepe': "Las contraseñas no coinciden"
};

/**
 * Array clave / valor con los contenidos de los mensajes de requisitos de los campos.
 */

var campoInformacion =
{ 
    'Nombre':'Introduce tu Nombre: Entre 3 y 20 letras, sin números.',
    'Apellidos':'Introduce tu/s apellido/s: Entre 3 y 40 letras, sin números.',
    'Dni':'Introduce tu DNI o NIE: DNI: 00000000A',
    'Email':'Introduce un email válido.',
    'Passwd':'Introduce tu contraseña, entre 8 y 20 caracteres.',
    'Passwdrep':'Repite tu contraseña.'
};

/**
 * Cadena que representa las letras por índice de los DNIs.
 */

var letrasDni = "TRWAGMYFPDXBNJZSQVHLCKE";

/**
 * @name = Funciones de validación.
 */

/**
 * Comprueba que el campo seleccionado, cumple con los distintos 
 * validadores que contiene en su etiqueta de validar. 
 * 
 * Si cumple con todas no añade nada, pero si no cumple con alguna lo pinta de rojo
 * y añade el error correspondiente a la esquina superior derecha de la pantalla.
 * 
 * @param {*} campo Objeto tipo input.
 */
function validarCampo(campo) 
{
    var validaciones = $(campo).attr('validar').split(',');

    //Por cada validador llamo al metodo valida que comprueba si lo cumple o no.
    validaciones.forEach(validacion => {
        validacion = validacion.trim();
        valida(validacion, campo)           //Si el validador devuelve true, 
        ? 
            listaErrores(validacion, false) &       //Borra el error de errores
            mensajeError(validacion, false) &       //Borra el mensaje de error si sigue en la pantalla
            (errores.length > 0)                           //Si sigue habiendo errores, 
            ? 
                pintarRojo(campo, true)             //Pinta el campo de rojo
            : 
                pintarRojo(campo, false)            //Quita el rojo del campo
        :                                   //Si el validador devuelve false,
            listaErrores(validacion, true) &        //Añade el error al array
            mensajeError(validacion, true) &        //Añade un mensaje de error (si no existe ya).
            pintarRojo(campo, true);                 //Pinta el campo de rojo.
    });
}


/**
 * Valida la expresión regular dada por el dato tipo en el valor del parámetro campo.
 * 
 * @param {*} tipo Expresión regular.
 * @param {*} campo Objeto tipo input.
 * @returns Boolean
 */
function valida(tipo, campo)
{
    var regex = validadores[tipo];
    switch (tipo)                       //Según el tipo de validador dado, realiza la comprobación correspondiente.
    {
        case 'passRepe':
            //Comprueba que las contraseñas sean iguales.
            return OBJ_PASSWD.val() == OBJ_PASSWDREP.val();
        break;
        case 'dni': 
            //Comprueba si el DNI son 8 números y una letra y después valida la letra.
            return regex.test(campo.value) 
            ?
                validaDni(campo.value)
            : 
                false;
        break;
            //Validación general del resto de cadenas.
        default: return regex.test(campo.value);
    }
}

/**
 * Valida que el formato del DNI sea correcto en base a las normas de la FNMT.
 * La cual indica que la parte numérica del dni se divide entre 23 y el resto 
 * se compara con la lista de letras dadas por la variable @var = letrasDni.
 * 
 * @param {*} dni Valor del campo dni.
 * @returns Boolean.
 */

function validaDni(dni)
{
    var dniValues = dni.substring(0, 8);                //Obtiene la parte numérica.
    var indice = parseInt(dniValues%23);                //Calcula el índice.
    return dni.charAt(8) == letrasDni.charAt(indice)      //Lo compara.
}

/**
 * @name = Funciones de utilidad.
 */


/**
 * Sitúa todos los valores importantes a 0.
 */
function limpiarFormulario() 
{
    OBJ_NOMBRE.val("");
    OBJ_APELLIDOS.val("");
    OBJ_DNI.val("");
    OBJ_EMAIL.val("");
    OBJ_PASSWD.val("");
    OBJ_PASSWDREP.val("");
    $('.incorrecto').removeClass('incorrecto');
    errores = [];
    for(let info of OBJ_INFOSFORM)      //Recorre y borra todos los cuadros de información.
    {
        info.remove();
    };
}

/**
 * Muestra el campo de información que muestra los requisitos de cada campo.
 * 
 * @param {*} campo Campo que recibe la acción.
 * @param {*} mostrar True si se muestra, false si se oculta.
 */
function infoCampos(campo, mostrar) 
{
    if (mostrar) 
    {
        var infoDiv = $('<div>').addClass('info').attr('id', 'info').text(campoInformacion[campo.id]);
        $(campo).parent().append(infoDiv);
    } 
    else 
    {
        $(campo).parent().find('div').remove();
        
        //Esta línea está comentada porque el método focus de Jquery da problemas con la eliminación de los
        //objetos de información (div). De todos modos, es un requisito del ejercicio que tal y como he 
        //desarrollado yo la solución. da problemas.
        /*
            if (errores.length > 0) 
            {
                $(campo).focus();   
            }
        */
    }
}


/**
 * Muestra un mensaje de error en la parte superior derecha. O lo elimina.
 * 
 * @param {*} tipo Define el tipo de validador dado, el cual se usa para coger el mensaje de error.
 * @param {*} accion True, se crea. False, se borra si existe.
 */
function mensajeError(tipo, accion) 
{
    if (accion) 
    {
        var delError = $('<button>').attr('id', 'borrarError').on('click', (event) => {
            $(event.target).parent().remove();
        });

        var erroresDiv = $('<div>').addClass('error').attr('id', 'error').attr('title', tipo).text(msjError[tipo]);
        erroresDiv.append(delError);

        if (!$('#cabecero').find(`[title="${tipo}"]`).length) 
        {
            $('#cabecero').append(erroresDiv);
        }
    } 
    else 
    {
        $('#cabecero').find(`[title="${tipo}"]`).remove();
    }
}

/**
 * Añado los errores encontrados al array de errores, o los borro.
 * 
 * @param {*} validacion Parámetro del tipo de validador.
 * @param {*} accion True, añadir. False, borrar.
 */
function listaErrores(validacion, accion){

    if(accion)
    {
        //Compruebo si existe y si no existe lo añado.
        errores.includes(validacion) ? null : errores.push(validacion);
    }
    else
    {
        //Compruebo si existe y si existe lo borro.
        errores.includes(validacion) 
        ? 
            errores = errores.filter(error => error != validacion) 
        : 
            null;
    }
}

/**
 * Pinta de rojo, el fondo del campo dado. 
 * 
 * @param {*} campo Campo a pintar.
 * @param {*} accion True, pintar. False, limpiar.
 */

function pintarRojo(campo, accion)
{
    accion 
    ? 
        $(campo).addClass('incorrecto')
    : 
        $(campo).removeClass('incorrecto');
}

/**
 * Crea el cuadro de información que te muestra que el formulario no se va a enviar y te 
 * muestra los errores existentes.
 */

/**
 * Muestra la pantalla que inhabilita el formulario.
 */
function errorAlEnviar() {
    // Muestra la pantalla que inhabilita el formulario.
    OBJ_RESULTADO.addClass('mostrar');
    
    // Crea el cuadro de información.
    var div = $('<div></div>').addClass('resultadoError');
    var h1 = $('<h1></h1>').text('Error al enviar.');
    var p = $('<p></p>').text('Ha habido un error al enviar el formulario. Comprueba que todos los datos estén correctos');
    
    div.append(h1).append(p);
    
    // Recorre los errores existentes y los añade al cuadro.
    if (errores.length > 0) {
        errores.forEach(function(error) {
            var pE = $('<p></p>').text(msjError[error]);
            div.append(pE);
        });
    }

    // Lo imprime en el HTML.
    OBJ_RESULTADO.append(div);
}

/**
 * Crea el cuadro de información que te muestra que el formulario se ha enviado.
 */
function enviadoCorrectamente() {
    // Muestra la pantalla que inhabilita el formulario.
    OBJ_RESULTADO.addClass('mostrar');

    // Crea el cuadro de información.
    var div = $('<div></div>').addClass('resultadoCorrecto');
    var h1 = $('<h1></h1>').text('Formulario enviado correctamente');
    var p = $('<p></p>').text('El formulario se ha enviado correctamente. Gracias por su tiempo.');
    
    div.append(h1).append(p);

    // Lo imprime en el HTML.
    OBJ_RESULTADO.append(div);
}

/**
 * Función del botón que borra el cuadro de información de la pantalla que inhabilita el
 * formulario y justo después, habilita el formulario.
 */
function ocultarResultado() {
    OBJ_RESULTADO.removeClass('mostrar');
    OBJ_RESULTADO.children().last().remove();
}
