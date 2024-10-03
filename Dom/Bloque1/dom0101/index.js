let btnRojo = document.getElementById("btnRojo");
let btnVerde = document.getElementById("btnVerde");
let btnAzul = document.getElementById("btnAzul");
let textInput = document.getElementById("textInput")

btnRojo.addEventListener("click", rojo);
btnVerde.addEventListener("click", verde);
btnAzul.addEventListener("click", azul);

function rojo() 
{
    let color = (window.getComputedStyle(btnRojo)).getPropertyValue('background-color');
    textInput.style.backgroundColor = color;
}

function verde()
{
    let color = (window.getComputedStyle(btnVerde)).getPropertyValue('background-color');
    textInput.style.backgroundColor = color;
}

function azul()
{
    let color = (window.getComputedStyle(btnAzul)).getPropertyValue('background-color');
    textInput.style.backgroundColor = color;
}