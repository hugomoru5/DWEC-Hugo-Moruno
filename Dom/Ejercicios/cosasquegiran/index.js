
let square = document.getElementById("square");
let cuadrado = document.getElementById("cuadrado");

square.addEventListener("click" , giraCuadrado);

async function giraCuadrado() 
{
    cuadrado.animate(
        [
            { transform: "rotate(0) scale(1)" },
            { transform: "rotate(720deg) scale(1)" },
        ],
        4000
    )
}


let triangle = document.getElementById("triangle");
let triangulo = document.getElementById("triangulo");

triangle.addEventListener("click" , giraTriangulo);

async function giraTriangulo() {

    triangulo.animate(
        [
            { transform: "scaleY(1) scale(1)" },
            { transform: "scaleY(2) scale(1)" },
            { transform: "scaleY(1) scale(1)" },
            { transform: "scaleY(2) scale(1)" },
            { transform: "scaleY(1) scale(1)" },
        ],
        4000
    )
}

let circle = document.getElementById("circle");
let circulo = document.getElementById("circulo");

circle.addEventListener("click" , giraCirculo);

async function giraCirculo() {

    circulo.animate(
        [
            { translate: "0px" },
            { translate: "150px" },
            { translate: "0px" },
            { translate: "-150px" },
            { translate: "0px" },
        ],
        4000
    )
}

let todos = document.getElementById("todos");

todos.addEventListener("click", giraTodos);

async function giraTodos(){
    giraCirculo();
    giraCuadrado();
    giraTriangulo();
}