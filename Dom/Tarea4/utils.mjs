"use strict";

/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '15/10/2024'
 */

/**
 * Componentes del archivo principal que se importan.
 */

import * as main from "./tresenraya.mjs";

/**
 * Componentes del archivo actual que se exportan.
 */

export 
{ 
    anadirFicha,
    reiniciar,
    limpiarContadores,
    siguienteFicha,
    inicio,
    turno
};

/**
 * @name = Variables de inicio.
 */

const OBJ_PANTINFO = $('#pantallaInfo');
const OBJS_CASILLAS = $('main>#tablero>div');
const OBJ_SIGUIENTEFICHA = $('main>section>div>#next');
const OBJS_CONTADORES = $('footer>div>div');
/**
 * Array de posibilidades de victoria.
 */
const PATRONES_VICTORIA = 
[
    ['upleft','upmid', 'upright'],
    ['midleft', 'midmid', 'midright'],
    ['downleft', 'downmid', 'downright'],
    ['upleft', 'midleft', 'downleft'],
    ['upmid', 'midmid', 'downmid'],
    ['upright', 'midright', 'downright'],
    ['upleft', 'midmid', 'downright'],
    ['upright', 'midmid', 'downleft']
]


/**
 * Clase turno
 */
class turno
{
    #numero;
    constructor()
    {
        this.#numero = 0;
    }
    //Añade un turno al juego y coloca en el cuadro de siguiente ficha la correspondiente.
    anadirTurno() 
    {
        this.#numero++;
        siguienteFicha(this.#numero);
    }
    //Settea el turno a 0.
    clearTurno()
    {
        this.#numero = 0;
    }
    //Consigue el turno.
    turno() 
    {
        return this.#numero;
    }
}

/**
 * @name = Funciones de validación.
 */

/**
 * Funciones que se ejecutan al iniciar la página, muestra un cuadro de información y un botón.
 */
function inicio() 
{
    //Muestra la pantalla de info.
    OBJ_PANTINFO.addClass('mostrar');
    //Creo el panel de información.
    var initDiv = $('<div></div>');
    var initH1 = $('<h1></h1>');
    var initParr = $('<p></p>');
    initH1.text('¡Bienvenido al Tres en Raya!');
    initParr.text('Bienvenido! El juego es sencillo, enlaza tres símbolos iguales en línea para ganar a tu oponente.');
    initDiv.addClass('divInicio');
    initDiv.append(initH1);
    initDiv.append(initParr);
    OBJ_PANTINFO.append(initDiv);
    //Muestra la primera 'siguiente ficha' de la partida.
    siguienteFicha(0);
}


/**
 * Muestra la siguiente ficha que se va a colocar en el tablero.
 * @param {*} turno 
 */
function siguienteFicha(turno)
{
    //Imágenes
    var imgO = '<img src="./img/circulo.png" alt="circulo">';
    var imgX = '<img src="./img/equis.png" alt="equis">';

    //Se cambia la siguiente ficha según el turno.
    if(turno % 2 == 0)
    {
        if (OBJ_SIGUIENTEFICHA.first().html() != '')
        {
            OBJ_SIGUIENTEFICHA[0].childNodes[0].remove();
        }
        OBJ_SIGUIENTEFICHA.append(imgX);
    }
    else
    {
        if (OBJ_SIGUIENTEFICHA.first().html() != '')
        {
            OBJ_SIGUIENTEFICHA[0].childNodes[0].remove();
        }
        OBJ_SIGUIENTEFICHA.append(imgO);
    }
}


/**
 * Añade una ficha a una casilla si ésta está vacía. Según el turno una u otra.
 * 
 * @param {*} casilla 
 * @param {*} turno 
 * @returns 
 */
function anadirFicha(casilla, turno)
{
    //Imágenes
    var imgO = '<img src="./img/circulo.png" alt="circulo">';
    var imgX = '<img src="./img/equis.png" alt="equis">';

    //Añade la ficha a la casilla si ésta está vacía y comprueba la situación de la partida.
    if (!(casilla.first().html() != ''))
    {
        if(turno % 2 == 0)
        {
            casilla.append(imgX);
            var comprobacion = comprobarVictoria()
            if(comprobacion.includes(true))
            { 
                victoria(comprobacion[8]);
                return false;
            }
            return true;
        }
        else
        {
            casilla.append(imgO);
            var comprobacion = comprobarVictoria()
            if(comprobacion.includes(true))
            { 
                victoria(comprobacion[8]);
                return false;
            }
            return true;
        }
    }
    return false;
}

/**
 * Comprueba que el tablero actual tenga o no condición de victoria.
 * @returns Array de Booleans y signo del ganador.
 */

function comprobarVictoria()
{
    var victoria = [];
    var signo;
    PATRONES_VICTORIA.forEach((patron) => {
        var numCasilla = 0;
        var primera = null;
        var segunda = null;
        var tercera = null;
        var correcto = true;
        //Algoritmo de comprobación de la victoria.
        patron.forEach((casilla) => {
            if (correcto == true)
            {
                if(numCasilla == 0)
                {
                    primera = OBJS_CASILLAS.filter('#'+casilla);
                    primera[0].childElementCount == 0 ? correcto = false : null;
                }
                if(numCasilla == 1)
                {
                    segunda = OBJS_CASILLAS.filter('#'+casilla);
                    segunda[0].childElementCount == 0 ? correcto = false : null;
                    if (primera[0].childElementCount > 0 && segunda[0].childElementCount > 0)
                    {
                        primera[0].children[0].alt == segunda[0].children[0].alt ? null : correcto = false;
                    }
                }
                if(numCasilla == 2)
                {
                    tercera = OBJS_CASILLAS.filter('#'+casilla);
                    tercera[0].childElementCount == 0 ? correcto = false : null;
                    if (segunda[0].childElementCount > 0 && tercera[0].childElementCount > 0)
                    {
                    segunda[0].children[0].alt == tercera[0].children[0].alt ? signo = tercera[0].children[0].alt : correcto = false;
                    }
                }
                numCasilla++;
            }
        });
        victoria.push(correcto);
    });
    victoria.push(signo);
    return victoria;
}

/**
 * Una vez comprobada la victoria se crea la pantalla de victoria, se muestra y se actualizan los datos.
 * 
 * @param {*} signo 
 */
function victoria(signo)
{
    //Creo el panel de victoria.
    var initDiv = $('<div></div>');
    var initH1 = $('<h1></h1>');
    var initParr = $('<p></p>');
    initH1.text('¡Victoria!');
    initParr.text('El ganador de la partida ha sido: '+signo);
    initDiv.addClass('divInicio');
    initDiv.append(initH1);
    initDiv.append(initParr);
    OBJ_PANTINFO.append(initDiv);
    //Según el objeto que devuelva victoria(), se añade una partida ganada a uno u otro.
    switch (signo)
    {
        case 'equis': 
            var contX = OBJS_CONTADORES[1].children[1];
            contX.innerText = parseInt(contX.innerText) + 1;
        break;
        case 'circulo':
            var contO = OBJS_CONTADORES[2].children[1];
            contO.innerText = parseInt(contO.innerText) + 1;
        break;
    }
    var contPart = OBJS_CONTADORES[0].children[1];
    contPart.innerText = parseInt(contPart.innerText) + 1;
    //Aquí se reincia el estado del tablero.
    reiniciar();
    main.TURNO.clearTurno();
    OBJ_PANTINFO.addClass('mostrar');
}

/**
 * Reinicia las casillas y el cuadrado de siguiente ficha.
 */

function reiniciar() 
{ 
    OBJS_CASILLAS.each(function(){
        var div = $(this)[0];
        if(div.childElementCount > 0)
        {
            div.childNodes[0].remove();
        }
    });
    siguienteFicha(0);
}

/**
 * Pone los contadores del footer a 0.
 */
function limpiarContadores()
{
    OBJS_CONTADORES.each(function(){
        $(this).children().eq(1).text(0);
    });
}