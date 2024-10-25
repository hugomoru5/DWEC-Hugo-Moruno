//--------------------------------------------------------
// Dependencias del módulo
//--------------------------------------------------------
import * as http from '../../lib/http.mjs'

export 
{
    tabla
}
/**
 * Clase tabla.
 */

class tabla {
    //Número de página actual, por defecto 1.
    pagina = 1;

    //Contenido html
    html = null;

    //Objeto de respuesta de la librería http
    #objetoResponse = null;

    //Plantilla según la que se rige la tabla
    plantillaTabla = null;

    //Gaurda la url si no hay ninguna.
    savedUrl = null;

    constructor() {}

    get getPagina()
    {
        return this.pagina;
    }

    set setPagina(num)
    {
        this.pagina = num;
    }

    set setPlantilla(plantilla)
    {
        this.plantillaTabla = (plantilla);
    }

    //Formatea y devuelve el objeto html
    crearTabla(url = this.savedUrl, plantilla = this.plantillaTabla, numeroPagina = 1)
    {
        //Gaurda los datos para no tener que llamarlos otra vez
        this.savedUrl = url;
        this.plantillaTabla = plantilla;
        this.pagina = numeroPagina;

        var formatedUrl = `${url}?_page=${numeroPagina}&_limit=${TABLA_REGISTROS_POR_PAGINA}`;
        return this.obtenerDatos(formatedUrl)
                .then(() => {
                    this.formatearDatos(plantilla);
                    return this.html;
                });
    }

    //Obtener los datos del servidor
    obtenerDatos(url)
    {
        return http.get(url)
            .then(response => response.json())
            .then(datos => {
                this.#objetoResponse = datos;
            })
            .catch(error => {
                console.log("Error", error);
            });
    }

    //Formatea el objeto json a un objeto jquery
    formatearDatos(plantilla)
    {
        this.html = json2html.render(this.#objetoResponse, plantilla);
    }

    anterior()
    {
        if(this.pagina > 1)
        {
            return this.crearTabla( this.savedUrl, this.plantillaTabla, this.pagina-1);
        }
    }

    siguiente()
    {
        return this.crearTabla( this.savedUrl, this.plantillaTabla, this.pagina+1)
    }
}