/**
 * @name = Hugo Moruno.
 * 
 * @fecha = 23/10/2024.
 * 
 */

/**
 * Constantes.
 */

const BTN_SUMAR = document.getElementsByTagName('button');
const OBJS_INPUTS = document.getElementsByTagName('input');

var resultado = 0;

/**
 * Main
 */

window.addEventListener('load', () => {

    limpiarInputs(true);

    BTN_SUMAR[0].addEventListener('click', () => {
        
        limpiarInputs(true);
        
    });

    BTN_SUMAR[1].addEventListener('click', () => {
        
        sumarInputs();
        mostrarResultado();
        limpiarInputs(false);

    });
    
});

/**
 * Funciones
 */

function sumarInputs()
{
    for(var i =0; i <10 ; i++){
        resultado = resultado += Number(OBJS_INPUTS[i].value);
    }
}

function mostrarResultado()
{
    OBJS_INPUTS[10].value = resultado;
}

function limpiarInputs(resul)
{
    for(var i =0; i <10 ; i++)
    {
        OBJS_INPUTS[i].value = 0;
        resultado = 0;
    }
    if(resul)
    {
        OBJS_INPUTS[10].value = 0;
    }
}
