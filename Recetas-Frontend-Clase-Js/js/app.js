/**
 * @author = Hugo Moruno Parra
 * 
 * @fecha = ''
 */

/**
 * @name = Variables de inicio.
 */

const WORKSPACE = $('#workspace');
const ENLACES = $('a[pagina="si"]');

/**
 * @name = Main.
 */

$(window).on('load', function(){

    WORKSPACE.load('./html/recetas.html');
    ENLACES.each(function()
    {
        $(this).on('click', function(e) {
            loadPage($(this).attr('enlace'));
        });
    }
)

});

/**
 * Funciones
 */

function loadPage(url)
{
    WORKSPACE.load(url);
}
