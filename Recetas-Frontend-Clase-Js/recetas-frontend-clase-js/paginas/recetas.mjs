//--------------------------------------------------------
// Dependencias del módulo
//--------------------------------------------------------
import * as tabla from '../js/componentes/tabla.mjs';
import * as paginador from '../js/componentes/paginador.mjs';



//--------------------------------------------------------
// Constantes
//--------------------------------------------------------

const URL_RECETAS = "http://localhost:3000/recetas"

const TBODY_RESULTADO = document.getElementById("resultado");
const DIV_PAGINADOR = "#paginador";

const JSON2HTML_PLANTILLA_TABLA = {
      '<>': 'tr','html': [
      {'<>': 'th','scope':'row','html': '${id}'},
      {'<>': 'td','html': '${nombre}'},
      {'<>': 'td','html': '${descripcion}'},
    ]
};


//-------------------------------------------------------
// Inicialización de la página de recetas
//-------------------------------------------------------

$("#recetas").ready(() => {

    // Renderiza la tabla
    tabla.renderizar(
        URL_RECETAS, 
        TBODY_RESULTADO, 
        JSON2HTML_PLANTILLA_TABLA
    );    

    // Renderiza el paginador
    paginador.renderizar(DIV_PAGINADOR, 
        () => tabla.anterior(TBODY_RESULTADO), 
        () => tabla.siguiente(TBODY_RESULTADO)
    );
});


