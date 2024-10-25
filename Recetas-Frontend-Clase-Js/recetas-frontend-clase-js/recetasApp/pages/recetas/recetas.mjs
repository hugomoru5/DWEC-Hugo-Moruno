//--------------------------------------------------------
// Dependencias del módulo
//--------------------------------------------------------
import * as tabla from '../../js/componentes/tabla/tablaClass.mjs';
import * as paginador from '../../js/componentes/paginador/paginador.mjs';

//--------------------------------------------------------
// Constantes
//--------------------------------------------------------

const TBODY_RESULTADO = $("#resultado");
const DIV_PAGINADOR = "#paginador";

const JSON2HTML_PLANTILLA_TABLA = {
      '<>': 'tr','html': [
      {'<>': 'th','scope':'row','html': '${id}'},
      {'<>': 'td','html': '${nombre}'},
      {'<>': 'td','html': '${descripcion}'},
    ]
};

const TABLA = new tabla.tabla();

//-------------------------------------------------------
// Inicialización de la página de recetas
//-------------------------------------------------------

$("#recetas").ready(() => {

    inicializar(URL_RECETAS, JSON2HTML_PLANTILLA_TABLA);

    $("#btnRecetas").on('click',function(){
        inicializar(URL_RECETAS, JSON2HTML_PLANTILLA_TABLA);
    });

});

/**
 * Funciones de utilidad.
 */

function inicializar(url, plantilla) 
{  
    TABLA.crearTabla(url, plantilla)
        .then(cuerpoTabla => {
            TBODY_RESULTADO.html(cuerpoTabla);

            // Renderiza el paginador
            paginador.renderizar(DIV_PAGINADOR, 
                () => anteriorPagina(), 
                () => siguientePagina()
            );
        })
        .catch(error => {
            console.error("Error al inicializar las recetas:", error);
            TBODY_RESULTADO.html('<tr><td colspan="3">Error al cargar las recetas. Intente de nuevo.</td></tr>');
        });
}

function anteriorPagina()
{
    TABLA.anterior()
    .then(cuerpoTabla => {
        TBODY_RESULTADO.html(cuerpoTabla);
    })
    .catch(error => {
        console.error("Error al cargar la página anterior:", error);
    });
}

function siguientePagina()
{
    TABLA.siguiente()
        .then(cuerpoTabla => {
            TBODY_RESULTADO.html(cuerpoTabla);
        })
        .catch(error => {
            console.error("Error al cargar la página siguiente:", error);
        });
}