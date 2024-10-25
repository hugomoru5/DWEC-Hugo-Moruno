//--------------------------------------------------------
// Dependencias del módulo
//--------------------------------------------------------
import * as tabla from '../../js/componentes/tabla/tablaClass.mjs';
import * as controlTabla from '../../js/componentes/tabla/controlTabla.mjs';

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

    inicializarRecetas();

    $("#btnRecetas").on('click', inicializarRecetas);

});

function inicializarRecetas() {
    controlTabla.inicializar(URL_RECETAS, JSON2HTML_PLANTILLA_TABLA, TABLA, TBODY_RESULTADO, DIV_PAGINADOR)
        .then(cuerpoTabla => {
            // Aquí puedes hacer algo con el cuerpo de la tabla
            TBODY_RESULTADO.html(cuerpoTabla);
            // Llama a paginador.renderizar si es necesario
            paginador.renderizar(DIV_PAGINADOR, 
                () => anteriorPagina(TABLA, TBODY_RESULTADO), 
                () => siguientePagina(TABLA, TBODY_RESULTADO)
            );
        })
        .catch(error => {
            console.error("Error al inicializar las recetas:", error);
            TBODY_RESULTADO.html('<tr><td colspan="3">Error al cargar las recetas. Intente de nuevo.</td></tr>');
        });
}
