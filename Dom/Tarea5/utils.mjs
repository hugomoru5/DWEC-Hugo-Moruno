/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = '21/10/2024'
 */

/**
 * Funciones exportadas de éste módulo.
 */
export
{
    inicio,
    comenzar,
    jugar,
    verInfo,
    verInicio
}

/**
 * @name = Variables de inicio.
 */

/**
 * Variables de objetos del DOM.
 */
const PANT_INICIO = $('#pantallaInicio');
const PANT_INFO = $('#pantallaInfo');
const OBJ_BLOB = $('#blob');
const OBJ_DIF = $('#dificultad');
const OBJ_PUNT = $('#puntuacion');
const OBJ_TIEMP = $('#tiempo');

/**
 * Variables de información del programa.
 */
var dificultad = 'Fácil';
var maxTiempo = 0;
var tamano = 0;
var reduccion = 0;
var intervaloTiempo = 0;
var tiempoRestante = 0;

/**
 * @name = Funciones de transcurso.
 */

/**
 * Función donde se inician los paneles de información a traves de la creación de objetos
 * de jquery.
 */
function inicio() 
{ 
    verInicio(true);
    PANT_INFO.append(
        $('<div></div>')
        .append(
            $('<h1></h1>').text('¡Bienvenido al juego Point and Win!')
        ).append(
            $('<p></p>').text('Toca el cuadrado dentro del tiempo estipulado para conseguir puntos y avanzar a la siguiente fase!')
        ).attr(
            'id','divInfo'
        )
    )
    verInfo(true);
}

/**
 * Función que comienza el juego:
 * 1. Crea el selector de dificultad.
 * 2. Lo muestra.
 * 3. Actualiza los valores en tiempo real según se elige la dificultad.
 * 4. Inicia el juego y ajusta la dificultad del mismo
 */
function comenzar() 
{
    //Muestra el panel del juego (Para partidas posteriores a la primera).
    verInicio(true);
    
    //Inicializa las variables todas a 0.
    limpiarJuego();
    
    //Crea el objeto html del selector.
    var selector = $('<div></div>');
        selector.append(
            $('<h1></h1>').text('Selecciona la dificultad:')
        );
        selector.append(
            $('<div></div>').attr('id','botonesDif')
            .append(
                $('<button></button>').val('Fácil').text('Fácil')
            ).append(
                $('<button></button>').val('Intermedio').text('Intermedio')
            ).append(
                $('<button></button>').val('Difícil').text('Difícil')
            )
        );
        selector.append(
            $('<section></section>').append(
                $('<h3></h3>').text('Dificultad:')
            ).append(
                $('<h3></h3>').attr('id','textoDificultad')
            )
        )
        selector.append(
            $('<button></button>').attr('id','selDificultad').text('¡COMENZAR!')
        );
        selector.addClass('selector');

    //Añade el selector a la pantalla
    PANT_INICIO.append(selector);

    //Añade un evento de escucha a los botones del div #botonesDif.
    $('#botonesDif').on('click', 'button', function() 
    {
        //Settea los valores una vez pulsado el botón.
        $('#textoDificultad').text($(this).val());
        dificultad = $(this).val();
        OBJ_DIF.text($(this).val());
        switch ($(this).val())
        {
            case 'Fácil':
                OBJ_TIEMP.text(200);
                break;
            case 'Intermedio':
                OBJ_TIEMP.text(150);
                break;
            case 'Difícil':
                OBJ_TIEMP.text(100);
                break; 
        }
    });

    //Guarda la dificultad y comienza el juego.
    $('#selDificultad').on('click', function() 
    {
        OBJ_PUNT.text(0);
        verInicio(false);
        PANT_INICIO.find('div.selector').remove();
        ajustarParametrosJuego();
    });
}

/**
 * Función que maneja el comienzo y el transcurso del propio juego, 
 * sólo se puede activar tras haber seleccionado dificultad.
 */
function jugar() 
{  
    //Borra el evento anterior (Para partidas posteriores a la primera.)
    OBJ_BLOB.off('click');

    //Inicia el contador.
    iniciarContador();

    //Añade el evento de click y comprueba si hay condición de victoria.
    OBJ_BLOB.on('click', function()
    {
        tamano = tamano - reduccion;
        OBJ_BLOB.css({
            width: `${tamano}px`,
            height: `${tamano}px`
        });
        moverBlob();

        //Actualiza el conteo de puntos mientras se va jugando.
        OBJ_PUNT.text(Number(OBJ_PUNT.text()) + Number(OBJ_TIEMP.text()));

        //Borra el temporizador de turno.
        clearInterval(intervaloTiempo);

        //Añade otro contador desde el tiempo de las características de la dificultad.
        iniciarContador();

        //Si el tamaño es menor o igual a 0 se ha ganado la partida.
        if (tamano <= 0) {
            finJuego(true);
        }
    });
}

/**
 * Se inicia un contador de tiempo para cada punto. 
 * Éste consta de la décima parte del timepo en ms estipulado 
 * porque al ir mostrándolo por pantalla, el tiempo corre más lento.
 */
function iniciarContador() 
{
    tiempoRestante = maxTiempo /10; 

    $('#tiempo').text(`${tiempoRestante}`);

    intervaloTiempo = setInterval(function() 
    {
        tiempoRestante--;
        $('#tiempo').text(`${tiempoRestante}`);

        //Si se acaba el tiempo, se acaba el juego.
        if (tiempoRestante <= 0) 
        {
            clearInterval(intervaloTiempo); 
            finJuego(false);
        }
    }, 10);
    //La función se repite cada 10ms para que el programa tenga menos carga.
}

/**
 * Función que determina si se ha ganado o perdido y muestra el correspondiente cuadro de información.
 * @param {*} victoria True si ha ganado (dado los 10 toques al cuadrado), False si ha perdido (se le ha acabado el tiempo en algún turno).
 */
function finJuego(victoria)
{
    //Borra el contador.
    clearInterval(intervaloTiempo);

    //Actualiza el contador de puntos.
    var puntos = OBJ_PUNT.text();
    
    //Si se ha ganado muestra la vistoria. En cambio, la derrota.
    if (victoria) 
    {
        PANT_INFO.append(
            $('<div></div>').append(
                $('<h1></h1>').text('¡VICTORIA!')
            ).append(
                $('<p></p>').text('Enhorabuena! Has completado las 10 rondas a tiempo!')
            ).append(
                $('<p></p>').text('Tu puntuación es de: '+puntos)
            ).attr('id','divInfo')
        )
    } 
    else 
    {
        PANT_INFO.append(
            $('<div></div>').append(
                $('<h1></h1>').text('¡DERROTA!')
            ).append(
                $('<p></p>').text('No has conseguido completar las 10 rondas en el tiempo estipulado :(')
            ).attr('id','divInfo')
        )
    }

    //Se muestra el panel de información.
    verInfo(true);

    //Se comienza la siguiente partida.
    comenzar();
}

/**
 * @name = Funciones de utilidad.
 */

/**
 * Función que mueve el objeto blob a cualquier sitio de la pantalla entre su posición inicial 0px, 0px
 * hasta las coordenadas escritas ahí abajo, 800px, 550px (tamaño del campo de juego.)
 */
function moverBlob() 
{
    let contenedorAncho = 800;
    let contenedorAlto = 550;
    let blobAncho = OBJ_BLOB.width();
    let blobAlto = OBJ_BLOB.height();

    let newLeft = Math.floor(Math.random() * (contenedorAncho - blobAncho));
    let newTop = Math.floor(Math.random() * (contenedorAlto - blobAlto));

    OBJ_BLOB.css('left', `${newLeft}px`);
    OBJ_BLOB.css('top', `${newTop}px`);
}

/**
 * Función que ajusta los parámetros de la dificultad según la información que haya dentro de la variable dificultad.
 */
function ajustarParametrosJuego() 
{  
    switch (dificultad)
    {
        case 'Fácil':
            maxTiempo = 2000;
            tamano = 100;
            reduccion = 10;
            break;
        case 'Intermedio':
            maxTiempo = 1500;
            tamano = 80;
            reduccion = 8;
            break;
        case 'Difícil':
            maxTiempo = 1000;
            tamano = 60;
            reduccion = 6;
            break;  
    }

    //Ajusta el tamaño del blob al de la dificultad elegida.
    OBJ_BLOB.css({
        width: `${tamano}px`,
        height: `${tamano}px`,
        left: '0px',
        top: '0px'
    });

    //Comienza el juego.
    jugar();
}

/**
 * Limpia las variables del juego. Cierra el intervalo de tiempo de juego.
 * Coloca al blob en su sitio. Borra el gestor de eventos del blob.
 */
function limpiarJuego()
{
    maxTiempo = 0;
    tamano = 0;
    reduccion = 0;
    clearInterval(intervaloTiempo);
    tiempoRestante = 0;

    OBJ_BLOB.css({
        width: `${tamano}px`,
        height: `${tamano}px`,
        left: '0px',
        top: '0px'
    });

    OBJ_BLOB.off('click');
}

/**
 * Muestra o esconde la pantalla de Información añadiendo o borrando la clase mostrar.
 * @param {*} accion True muestra, False esconde.
 */
function verInfo(accion) 
{  
    accion 
    ?
    PANT_INFO.addClass('mostrar')
    :
    PANT_INFO.removeClass('mostrar');
}

/**
 * Muestra o esconde la pantalla de Inicio añadiendo o borrando la clase mostrar.
 * @param {*} accion True muestra, False esconde.
 */
function verInicio(accion) 
{  
    accion 
    ?
    PANT_INICIO.addClass('mostrar')
    :
    PANT_INICIO.removeClass('mostrar');
}