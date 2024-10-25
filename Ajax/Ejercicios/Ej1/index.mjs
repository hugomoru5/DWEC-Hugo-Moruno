
window.addEventListener("load", () =>{

    document.getElementById("get").addEventListener("click", get);
    document.getElementById("post").addEventListener("click", post);
    document.getElementById("put").addEventListener("click", put);
    document.getElementById("delete").addEventListener("click", del);

});

function get()
{
    console.log("get");
    fetch("http://localhost:3000/recetas")
    .then(response => response.json())
        .then(objeto => {
            console.log(objeto);
            console.log(objeto[0])
        });
}
function post()
{
    console.log("post");

    var receta = 
    {
        "nombre": "Salchichas",
        "descripcion": "Salchichas fritas en aceite de oliva",
        "fechaAlta": "01/01/2024",
        "tiempo": "2",
        "dificultad": "Fácil",
        "puntuacion": "2.5"
    }

    fetch("http://localhost:3000/recetas",
        {
            method: "POST",
            body: JSON.stringify(receta),
            headers:
            {
                "Content-Type": "application/json"
            }
        }
    );
}
function put()
{
    console.log("put");

    var receta = 
    {
        "nombre": "Salchichas",
        "descripcion": "Salchichas fritas en aceite de oliva",
        "fechaAlta": "01/01/2024",
        "tiempo": "2",
        "dificultad": "Fácil",
        "puntuacion": "2.5"
    }

    fetch("http://localhost:3000/recetas",
        {
            method: "PUT",
            body: JSON.stringify(receta),
            headers:
            {
                "Content-Type": "application/json"
            }
        }
    );
}
function del()
{
    console.log("delete");

    fetch("http://localhost:3000/recetas/3",
        {
            method: "DELETE",
        }
    )
    .then(response => {
        console.log('borrado');
    });
}