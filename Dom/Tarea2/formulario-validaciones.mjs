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
const OBJ_NOMBRE = document.getElementById('Nombre');
const OBJ_APELLIDOS = document.getElementById('Apellidos');
const OBJ_DNI = document.getElementById('Dni');
const OBJ_EMAIL = document.getElementById('Email');
const OBJ_PASSWD = document.getElementById('Passwd');
const OBJ_PASSWDREP = document.getElementById('Passwdrep');

/**
 * Variables que contienen elementos del dom que realizan acciones.
 */

const OBJ_INFOSFORM = document.getElementsByClassName('info');
const OBJ_CABECERO = document.getElementById('cabecero');
const OBJ_RESULTADO = document.getElementById('submitResult');

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

    //Obtengo los validadores
    var validaciones = campo.attributes.validar.value.split(',');

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
            return OBJ_PASSWD.value == OBJ_PASSWDREP.value ? true : false;
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
        default: return regex.test(campo.value) ? true : false;
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
    if (dni.charAt(8) != letrasDni.charAt(indice))      //Lo compara.
    {
        return false;
    }
    else
    {
        return true;
    }
}

/**
 * @name = Funciones de utilidad.
 */


/**
 * Sitúa todos los valores importantes a 0.
 */
function limpiarFormulario()
{
    OBJ_NOMBRE.value = ""; 
    OBJ_APELLIDOS.value = ""; 
    OBJ_DNI.value = ""; 
    OBJ_EMAIL.value = ""; 
    OBJ_PASSWD.value = ""; ;
    OBJ_PASSWDREP.value = ""; 
    OBJ_NOMBRE.classList.remove('incorrecto');
    OBJ_APELLIDOS.classList.remove('incorrecto');
    OBJ_DNI.classList.remove('incorrecto');
    OBJ_EMAIL.classList.remove('incorrecto');
    OBJ_PASSWD.classList.remove('incorrecto')
    OBJ_PASSWDREP.classList.remove('incorrecto');
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
    if (mostrar)                                            //Si accion es true
    {
        var infoDiv = document.createElement('div');        //Crea el elemento div
        infoDiv.className = 'info';
        infoDiv.id = 'info';
        infoDiv.textContent = campoInformacion[campo.id];   //Establece parametros y contenido.
        campo.parentNode.appendChild(infoDiv);              //Lo añade a el campo.
    }
    else 
    {
        campo.parentNode.removeChild(campo.parentNode.lastChild)    //Como el campo de información siempre se 
        if(errores.length > 0)                                      //añade al final, la orden de borrado lo borra ahí.
        {
            campo.focus();              //Si hay errores, se bloquea el focus en el campo.
        }
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
        //Creo el botón para borrar el error.
        var delError = document.createElement('button');
        delError.id = 'borrarError';
        delError.addEventListener('click', (error) => {
            OBJ_CABECERO.removeChild(error.target.parentNode);
        });

        //Creo el dontenedor del error.
        var erroresDiv = document.createElement('div');
        erroresDiv.className = 'error';
        erroresDiv.id = 'error';
        erroresDiv.title = tipo;
        erroresDiv.textContent = msjError[tipo];
        
        //Le asigno el botón para borrarlo.
        erroresDiv.appendChild(delError);

        //Una vez creado, obtengo la cabecera.
        var divsErrores = OBJ_CABECERO.childNodes;
        var divEncontrado = false;

        //Compruebo si está vacía y si no lo está, compruebo que el mensaje que voy 
        //a introducir no exista ya en ella.
        if(divsErrores.length > 0)
        {
            divsErrores.forEach((div) => {
                if (div.title == tipo)
                {
                    divEncontrado = true;
                }
            });
            //Si el mensaje ya existe no se añade.
            divEncontrado ? null : OBJ_CABECERO.appendChild(erroresDiv) ;
        }
        else
        {
            //Si está vacía, se añade sin comprobar.
            OBJ_CABECERO.appendChild(erroresDiv);
        }
    }
    else
    {
        //Obtengo los divs de la cabecera.
        var divsErrores = OBJ_CABECERO.childNodes;
        //Si no está vacía, borro el div cuyo atributo title sea igual que el tipo de validador dado.
        if(divsErrores.length > 0)
        {
            divsErrores.forEach((div) => {
                if (div.title == tipo){
                    div.remove();
                }
            });
        }
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
        campo.classList.add('incorrecto') 
    : 
        campo.classList.remove('incorrecto');
}

/**
 * Crea el cuadro de información que te muestra que el formulario no se va a enviar y te 
 * muestra los errores existentes.
 */

function errorAlEnviar()
{
    //Muestra la pantalla que inhabilita el formulario.
    OBJ_RESULTADO.classList.add('mostrar');
    
    //Crea el cuadro de información.
    var div = document.createElement('div');
    div.className = 'resultadoError';
    var h1 = document.createElement('h1');
    h1.innerText = 'Error al enviar.'
    var p = document.createElement('p');
    p.innerText = 'Ha habido un error al enviar el formulario. Comprueba que todos los datos estén correctos';
    
    div.appendChild(h1);
    div.appendChild(p);
    
    //Recorre los errores existentes y los añade al cuadro.

    if(errores.length > 0)
    {
        errores.forEach((error) => {
            var pE = document.createElement('p');
            pE.innerText = msjError[error];
            div.appendChild(pE);
        });
    }

    //Lo imprime en el HTML.

    OBJ_RESULTADO.appendChild(div);
}

/**
 * Crea el cuadro de información que te muestra que el formulario se ha enviado.
 */

function enviadoCorrectamente()
{
    //Muestra la pantalla que inhabilita el formulario.
    OBJ_RESULTADO.classList.add('mostrar');

    //Crea el cuadro de información.
    var div = document.createElement('div');
    div.className = 'resultadoCorrecto';
    var h1 = document.createElement('h1');
    h1.innerText = 'Formulario enviado correctamente'
    var p = document.createElement('p');
    p.innerText = 'El formulario se ha enviado correctamente. Gracias por su tiempo.';

    div.appendChild(h1);
    div.appendChild(p);

    //Lo imprime en el HTML.
    OBJ_RESULTADO.appendChild(div);
}

/**
 * Función del botón que borra el cuadro de información de la pantalla que inhabilita el 
 * formulario y justo después, habilita el formulario.
 */

function ocultarResultado()
{
    OBJ_RESULTADO.classList.remove('mostrar');
    OBJ_RESULTADO.removeChild(OBJ_RESULTADO.lastChild);
}