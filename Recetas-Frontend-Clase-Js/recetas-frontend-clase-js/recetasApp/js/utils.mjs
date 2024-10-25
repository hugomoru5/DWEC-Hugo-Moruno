/**
 * Variables.
 */
const WORKSPACE = $('#workspace');
const ENLACES = $('[pagina]');
const PAG_CONTROL = "./pages/cuadro_mandos.html";

/**
 * Main.
 */
$(window).on('load', function(){
    loadPage(PAG_CONTROL)
    ENLACES.each(function()
    {
        $(this).on('click', function(e) {
            loadPage($(this).attr('pagina'));
        });
    });
});

/**
 * Funciones de utilidad.
 */
function loadPage(url)
{
    WORKSPACE.load(url);
}