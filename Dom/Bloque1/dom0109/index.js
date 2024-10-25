let info = document.getElementById('coordenadas');
let campo = document.getElementById('campodejuego');
let posicioncampo = campo.getBoundingClientRect();
let blob = document.getElementById('blob');

campo.addEventListener('mousemove', (e) => {
    let x = e.offsetX;
    let y = e.offsetY;

    x = Math.floor(x);
    y = Math.floor(y);

    info.innerText = `Coordenadas: (${x}, ${y})`;
});


window.addEventListener('load', () => {
    const delay = 1000;
    setInterval(moverBlob, delay);
})

function moverBlob(){
    let newLeft = Math.floor(Math.random() * (400 - 35));
    let newTop = Math.floor(Math.random() * (400 - 35));
    blob.style.left = `${newLeft}px`;
    blob.style.top = `${newTop}px`;
}

blob.addEventListener('click', (e) => {
    let red = Math.floor(Math.random()*255);
    let green = Math.floor(Math.random()*255);
    let blue = Math.floor(Math.random()*255); 
    console.log('Tocó : rgb('+red+","+green+","+blue+')');

    blob.style.backgroundColor = 'rgb('+red+","+green+","+blue+')';
})