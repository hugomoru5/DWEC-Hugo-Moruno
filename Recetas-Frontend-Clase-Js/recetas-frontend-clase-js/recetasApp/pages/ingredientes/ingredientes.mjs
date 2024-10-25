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
// Inicialización de la página de ingredientes
//-------------------------------------------------------

$("#ingredientes").ready(() => {

    controlTabla.inicializar(URL_INGREDIENTES, JSON2HTML_PLANTILLA_TABLA, TABLA, TBODY_RESULTADO, DIV_PAGINADOR);

    $("#btnIngredientes").on('click', function(){
        controlTabla.inicializar(URL_INGREDIENTES, JSON2HTML_PLANTILLA_TABLA, TABLA, TBODY_RESULTADO, DIV_PAGINADOR);
    });

});