    import * as paginador from '../paginador/paginador.mjs';

    export
    {
        inicializar,
        anteriorPagina,
        siguientePagina
    }

    function inicializar(url, plantilla, TABLA, TBODY_RESULTADO, DIV_PAGINADOR) 
    {  
        TABLA.crearTabla(url, plantilla)
            .then(cuerpoTabla => {
                TBODY_RESULTADO.html(cuerpoTabla);
                paginador.renderizar(DIV_PAGINADOR, 
                    () => anteriorPagina(TABLA, TBODY_RESULTADO), 
                    () => siguientePagina(TABLA, TBODY_RESULTADO)
                );
                return cuerpoTabla;
            })
            .catch(error => {
                console.error("Error al inicializar las recetas:", error);
                TBODY_RESULTADO.html('<tr><td colspan="3">Error al cargar las recetas. Intente de nuevo.</td></tr>');
            });
    }

    function anteriorPagina(TABLA, TBODY_RESULTADO)
    {
        TABLA.anterior()
        .then(cuerpoTabla => {
            TBODY_RESULTADO.html(cuerpoTabla);
        })
        .catch(error => {
            console.error("Error al cargar la página anterior:", error);
        });
    }

    function siguientePagina(TABLA, TBODY_RESULTADO)
    {
        TABLA.siguiente()
        .then(cuerpoTabla => {
            TBODY_RESULTADO.html(cuerpoTabla);
        })
        .catch(error => {
            console.error("Error al cargar la página siguiente:", error);
        });
    }