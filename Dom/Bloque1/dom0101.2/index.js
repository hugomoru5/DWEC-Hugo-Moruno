let botones = document.querySelectorAll('input[type="button"]');
let textInput = document.getElementById('textInput');

botones.forEach(btn => {
    btn.addEventListener ("click", (evt) => {
        let color = window.getComputedStyle(btn).getPropertyValue('background-color');
        console.log(color);
        textInput.style.backgroundColor = color;
    });
});